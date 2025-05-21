const Profile = require("../models/Profile")
const User = require("../models/User")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Courses");
const { uploadFileToCloudinary } = require("../utils/FileUploader");

// Update Profile   
exports.updateProfile = async (req, res) => {
    try {
        // fetch data
        const { firstName, lastName, dateOfBirth, about, gender, contactNumber } = req.body;

        // fetch userId
        const id = req.user.id

        // find profile
        const userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)

        // find&updateProfile
        userDetails.firstName = firstName || userDetails.firstName;
        userDetails.lastName = lastName || userDetails.lastName;
        profileDetails.dateOfBirth = dateOfBirth || profileDetails.dateOfBirth;
        profileDetails.about = about || profileDetails.about;
        profileDetails.gender = gender || profileDetails.gender;
        profileDetails.contactNumber = contactNumber || profileDetails.contactNumber;

        await profileDetails.save()
        await userDetails.save()

        // return response
        res.status(200).json({
            success: true,
            message: "Profile Updated Successflly",
            data: profileDetails
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updating profile",
            error: err
        })
    }
} 

// delete account
exports.deleteAccount = async (req, res) => {
    try {

        // get id
        const id = req.user.id

        // validation
        const userDetails = await User.findById(id)
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }


        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails })

        // UNEROLL USER FROM ALL ENROLLED COURSE
        await Course.updateMany(
            { studentsEnrolled: id },
            { $pull: { studentsEnrolled: id } }
        );
        // delete user
        await User.findByIdAndDelete({ _id: id })


        // return res
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })


    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong while delete profile",
            error: err.message
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        // get id
        const id = req.user.id

        // get details
        const userDetails = await User.findById(id).populate('additionalDetails').exec()

        // get response
        res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            data: userDetails
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong while fetching user details",
            error: err.message
        })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const userDetails = await User.find({}).populate('additionalDetails').populate('courses').populate('courseProgress')

        res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            data: userDetails
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong while fetching user details",
            error: err.message
        })
    }

}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const userDetails = await User.findById(userId).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "SubSection"
                }
            }
        }).populate("courseProgress").exec();

        if (!userDetails.courses || userDetails.courses.length === 0) {
            return res.status(200).json({
                success: true,
                message: "User is not enrolled in any courses",
                data: userDetails,
            });
        }

        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            let SubsectionLength = 0

            // Check if courseContent exists
            if (userDetails.courses[i].courseContent && userDetails.courses[i].courseContent.length > 0) {
                for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                    // Check if SubSection exists
                    if (userDetails.courses[i].courseContent[j].SubSection &&
                        userDetails.courses[i].courseContent[j].SubSection.length > 0) {
                        totalDurationInSeconds += userDetails.courses[i].courseContent[j].SubSection
                            .reduce((acc, curr) => acc + parseInt(curr.timeDuration || 0), 0);

                        SubsectionLength += userDetails.courses[i].courseContent[j].SubSection.length;
                    }
                }
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userID: userId,
            });

            const completedVideos = courseProgressCount?.completeVideos || [];
            courseProgressCount = completedVideos.length;

            if (SubsectionLength === 0) {
                userDetails.courses[i].courseProgress = 100;
            } else {
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].courseProgress =
                    Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier;
            }
        }
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            })
        }
        const image = req.files.pfp;
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            })
        }
        const uploadDetails = await uploadFileToCloudinary(
            image,
            process.env.FOLDER_NAME
        )
        // console.log("Upload Details : ", uploadDetails);
        const updateImage = await User.findByIdAndUpdate({ _id: id }, { image: uploadDetails.secure_url }, { new: true })
        res.status(200).json({
            success: true,
            message: "Image updated successfully",
            data: updateImage,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        });

    }
}

exports.instructorDashboard = async (req, res) => {
    try {
        const id = req.user.id
        const courseData = await Course.find({ instructor: id })
        const courseDetails = courseData.map((course) => {
            const totalStudent = course?.studentsEnrolled?.length
            const totalRevenue = course?.price * totalStudent;
            const courseStats = {
                _id: course.id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudent,
                totalRevenue,
            }
            return courseStats
        })
        res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            data: courseDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}