const crypto = require("crypto")
const {instance} = require("../config/RazorPay")
const Course = require('../models/Courses')
const User = require('../models/User')
const mailSender = require('../utils/MailSender')
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
const { default: mongoose } = require("mongoose")
const {paymentSuccess} = require("../mail/templates/paymentSuccess")
const CourseProgress = require("../models/CourseProgress")

// capture the payment and initate the razorpay order
exports.capturePayment = async(req,res)=>{

    const {courses} = req.body
    const userId = req.user.id

    if(courses.length===0){
        return res.status(404).json({
            success:false,
            message:"Please Provide Course ID"
        })
    }
    let totalAmount=0

    for(const course_id of courses){
        let course
        try{
            course = await Course.findById(course_id)
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:"Could not find the course"
                })
            }
            // console.log("course: ",course)
            const uid = new mongoose.Types.ObjectId(userId)
            // console.log(uid)
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:"Student is Already Enrolled in this course"        
                })
            }
            totalAmount +=course.price
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message || "Internal Server Error"
            })
        }
    }

    const options = {
        amount: totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString()
    }
    // console.log(options)
    try{
        const paymentResponse = await instance.orders.create(options);
        res.status(200).json({
            success:true,
            data:paymentResponse
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message: err.message || "Internal Server Errro"
        })
    }
}

// verify payment
exports.verifySignature=async(req, res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id

    if(!razorpay_order_id||
        !razorpay_payment_id||
        !razorpay_signature||!courses||!userId
    ){
        return res.status(404).json({
            success:false,
            message:"Could Not Find Proper Details"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256",process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")
    if(expectedSignature === razorpay_signature){

        // enrolledStudent
        await enrolledStudents(courses, userId, res)

        // return res
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }
    return res.status(500).json({
        success:false,
        message:"Payment Failed"
    })
}

const enrolledStudents= async(courses, userId ,res)=>{
    if(!courses||!userId){
        return res.status(404).json({
            success:false,
            message:"Please Provide Data for Courses or userID"
        })
    }
    for(const courseId of courses){
        try{
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
            )   
            // console.log("enrolledCourse : ",enrolledCourse)
            
            if(!enrolledCourse){
                return res.status(404).json({success:false, message:"Course Not Found"})
            }

            const courseProgress = await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completeVideos:[]
            })

            // find the student and add the course to their list of enrolled course
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {$push:{
                    
                    courses:courseId,
                    courseProgress:courseProgress._id
                }},{
                    new:true
                }
            )
            // send a success mail to student
             await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            )
            // console.log("Email Sent Successfully", emailResponse)
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message || "Error While Erolling Student"
            })
        }
    }
    
}
exports.sendPaymentSuccessEmail=async(req,res)=>{
    const {orderId, paymentId, amount} = req.body

    const userId = req.user.id

    try{
        const enrolledStudent = await User.findById(userId)
        await mailSender(
            enrolledStudent.email,
            "Payment Recieved",
            paymentSuccess(amount/100, paymentId, orderId,`${enrolledStudent.firstName}`, `${enrolledStudent.lastName}}`)
        )
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Could not send Email"
        })
    }

}
