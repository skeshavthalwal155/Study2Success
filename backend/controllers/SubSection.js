const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { uploadFileToCloudinary } = require("../utils/FileUploader")
require("dotenv").config()

// create subSection
exports.createSubSection = async (req, res) => {
    try {
        // fetch data
        const { sectionId, title, description } = req.body

        // extract video
        const video = req.files.videoUrl

        // upload video to cloudinary
        console.log("Before Upload")
        const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
        // console.log(uploadDetails)
        // Get duration - with fallback
        const videoDuration = uploadDetails.duration ||
            uploadDetails.video?.duration ||
            0; // Default fallback
        // console.log("uploadDetails duration : ", uploadDetails.duration)

        // create subSection
        const newSubSection = await SubSection.create({
            title: title,
            timeDuration: videoDuration,
            description: description,
            videoUrl: uploadDetails.secure_url
        })

        // push subsection in section schema
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    SubSection: newSubSection._id
                }
            }, { new: true }
        ).populate('SubSection')

        // send response
        res.status(200).json({
            success: true,
            message: "SubSection Created Successfully",
            data:updatedSection
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error While Creating SubSection"
        })
    }
}

// update SubSection
exports.updateSubSection = async (req, res) => {
    try {

        // date fetch from req body
        const { sectionId, subSectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Sub Section not Found "
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }

        if (req.files.videoUrl !== undefined) {
            const video = req.files.videoUrl
            const uploadDetails = await uploadFileToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            // console.log("Video Upload:  ", uploadDetails)
            const videoDuration = uploadDetails.duration ||
            uploadDetails.video?.duration ||
            0; // Default fallback
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = videoDuration
        }
        await subSection.save()

        //Find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate("SubSection")

        // return response
        res.status(200).json({
            success: true,
            message: "SubSection Updated Successfully",
            data: updatedSection
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error While updating SubSection",

        })
    }
}

// delete section
exports.deleteSubSection = async (req, res) => {
    try {

        // date fetch from req params
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    SubSection: subSectionId,
                }
            }
        )

        // delete data
        const deletedSubSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
        if (!deletedSubSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }
        const updatedSection = await Section.findById(sectionId).populate("SubSection")

        // return response
        res.status(200).json({
            success: true,
            message: "SubSection Deleted Successfully",
            data: updatedSection
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error While SubDeleting Section"

        })
    }
}