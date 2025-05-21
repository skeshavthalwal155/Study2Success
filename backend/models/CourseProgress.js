const mongoose = require("mongoose");
const Courses = require("./Courses");

const courseProgressSchema = new mongoose.Schema({

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    completeVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }],

});

courseProgressSchema.pre('save', async function(next){
    if(this.isModified('completeVideos')){
        const course = await Courses.findById(this.courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"SubSection"
            }
        });
        if(course){
            const totalSubSecions= course?.courseContent.reduce((total,section)=>total+(section.SubSection?.length || 0),0)
            this.progressPercentage = totalSubSecions > 0 ? Math.round((this.completeVideos.length/totalSubSecions)*100)
            : 0
        }
    }
    next()
})

courseProgressSchema.index({ courseId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("CourseProgress", courseProgressSchema)