const Section = require("../models/Section")
const Course = require("../models/Courses")
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
    try {
        // fetch data
        const { sectionName, courseId } = req.body

        // validation
        // if (!sectionName || !courseId) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "All Fields are mandatory"
        //     })
        // }

        // create section
        const newSection = await Section.create({ sectionName })

        // push section in course schema
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            }, { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "SubSection"
            }
        }).exec()
        // send response
        res.status(200).json({
            success: true,
            message: "Section Created Successfully",
            data: updatedCourseDetails
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error While Creating Section"

        })
    }
}

// update Section
exports.updateSection = async (req, res) => {
    try {
        // date fetch from req body
        const { sectionName , courseId } = req.body

        // // valdation
        // if (!sectionName) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "All Fields are mandatory"
        //     })
        // }

        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "SubSection"
                }
            }).exec()

        // return response
        res.status(200).json({
            success: true,
            message: section,
            data: course,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error While updating Section"

        })
    }
}

// delete section
exports.deleteSection = async (req, res) => {
    try {

        // date fetch from req body
        const { sectionId, courseId } = req.body

        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId
            }
        })

        const section = await Section.findById(sectionId)
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not Found",
            })
        }
        //delete sub section
        await SubSection.deleteMany({ _id: { $in: section.SubSection } });

        await Section.findByIdAndDelete(sectionId);

        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"SubSection"
            }
        })
        .exec()

        // return response
        res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            data: course
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error While Deleting Section",

        })
    }
}