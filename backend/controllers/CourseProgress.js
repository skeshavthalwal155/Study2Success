const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")

exports.updateCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req.body
    const userId = req.user.id

    try {
        // Check if the subsection is valid
        const subsection = await SubSection.findById(subSectionId)
        if (!subsection)
            return res.status(404).json({ success: false, message: "Invalid SubSection" })
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        })

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            })
        } else {
            // If Course Progress exists, check if the subsection is already completed
            if (courseProgress.completeVideos.includes(subSectionId)) {
                return res.status(400).json({ erorr: "Subsection Already Completed" })
            }

            // Push the subsection into the completedVideos array
            courseProgress.completeVideos.push(subSectionId)
        }

        // Save the Updated Course Progress
        await courseProgress.save()

        return res.status(200).json({ message: "Course Progress Updated" })
    } catch (error) {
        return res.status(500).json({ message: err.message || "Internal server error" })
    }
}