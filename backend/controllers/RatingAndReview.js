const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Courses")


// createRating
exports.createRating = async (req, res) => {

    try {
        //fetching user id
        const userId = req.user.id

        // fetch data from req body
        const { rating, review, courseId } = req.body

        // check if user is enrolled or not
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled:
            {
                $elemMatch:
                    { $eq: userId }
            }
        })
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in course"
            })
        }

        // check user already review or not
        const alreadyReview = await RatingAndReview.findOne({ user: userId, course: courseId })
        if (alreadyReview) {
            return res.status(403).json({
                success: false,
                message: "Course is already review by the user"
            })
        }

        // create rating
        const createReviewAndReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId
        })

        // updating course with rating and review
        await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: createReviewAndReview._id
                }
            }, { new: true }
        )

        // return response
        res.status(200).json({
            success: true,
            message: "Rating and review created successfully",
            data:createReviewAndReview
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Error Creating Rating"
        })
    }
}

// getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
        // get course id
        const courseId = req.body.courseId

        // calculate avg rating
        const result = await RatingAndReview.findById(courseId)

        // If no ratings found
        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                averageRating: 0,
                message: "No ratings found for this course"
            });
        }

        // return rating
        res.status(200).json({
            success: true,
            averageRating: result[0].averageRating,

        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// getAllRating
exports.getAllRating = async (req, res) => {
    try {

        const result = await RatingAndReview.find({}).sort({ rating: 'desc' }).populate({
            path: "user",
            select: "firstName lastName email image"
        }).populate({
            path: "course",
            select: "courseName"
        }).exec()

        // If no ratings found
        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                averageRating: 0,
                message: "No ratings found"
            });
        }

        // return rating
        res.status(200).json({
            success: true,
            message:"All Reviews and Rating fetched successfully",
            data:result
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}