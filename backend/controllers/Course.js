const Course = require("../models/Courses")
const Category = require("../models/Category")
const User = require("../models/User")
const { uploadFileToCloudinary } = require("../utils/FileUploader")
const CourseProgress = require("../models/CourseProgress")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const {convertSecondsToDuration} = require('../utils/SecToDuration')
require("dotenv").config()

// create course Handler
exports.createCourse = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user.id;

        // Get all required fields from request body
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        // Get thumbnail image from request files
        const thumbnail = req.files.courseThumbnail;
    
        // // Check if any of the required fields are missing
        if (
        	!courseName ||
        	!courseDescription ||
        	!whatYouWillLearn ||
        	!price ||
        	!tag ||
        	!thumbnail ||
        	!category
        ) {
        	return res.status(400).json({
        		success: false,
        		message: "All Fields are Mandatory",
        	});
        }

        if (!status || status === undefined) {
            status = "Draft";
        }
        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }

        // Check if the tag given is valid
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }
        // Upload the Thumbnail to Cloudinary
        const thumbnailImage = await uploadFileToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        // console.log(thumbnailImage);
        // Create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            courseThumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });

        // Add the new course to the User Schema of the Instructor
        await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id,
            },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );

        // Add the new course to the Categories
        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );
        // Return the new course and a success message
        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });
    } catch (error) {
        // Handle any errors that occur during the creation of the course
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create course",
        });
    }
};

// edit Course Details Handler
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not Found"
            })
        }
        //  If thumnail is not found, update it
        if (req.files) {
            // console.log("Thumbnail updated")
            const thumbnail = req.files.courseThumbnail;
            const thumbnailImages = await uploadFileToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImages.secure_url
        }
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }
        await course.save()
        const updateCourse = await Course.findOne({
            _id: courseId
        }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'SubSection'
                },
            }).exec()
        res.status(200).json({
            success: true,
            message: "Course Updated Successfullly",
            data: updateCourse
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

// get all course Handler
exports.getAllCourses = async (req, res) => {
    try {
        // collect all category
        const allCourses = await Course.find({},
            { status: "Published" },
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true
            }).populate('instructor').exec()
        res.status(200).json({
            success: true,
            message: "All Courses fetched Successfully",
            data: allCourses
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

exports.viewAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({})
            .populate('instructor')
            .populate({
                path:"courseContent",
                populate:"SubSection"
            }).populate("ratingAndReviews")
            .exec()
        res.status(200).json({
            success: true,
            message: "All Courses fetched Successfully",
            data: allCourses
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

// getCourseDetails Handler
exports.getCourseDetails = async (req, res) => {
    try {
        // get id
        const { courseId } = req.body
        // find course details
        const CourseDetails = await Course.find({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("category")
            .populate({
                path: "ratingAndReviews",
                populate: {
                    path: "user",
                    select: "firstName lastName accountType image"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "SubSection",
                    select: "-videoUrl"
                }
            })
            .exec();

        // validation
        if (!CourseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not found the course with course id ${courseId}`,
            })
        }
        return res.status(200).json({
            success: true,
            message: "Course Fetched successfully",
            data: CourseDetails
        })
    } catch (err) {
        // console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//  get full course details
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // console.log("Fetching course details for:", { courseId, userId });

        // Fetch course details
        const courseDetails = await Course.findOne({
            _id: courseId
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                path: 'courseContent',
                populate: {
                    path: "SubSection"
                }
            })
            .exec();

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Course not found with id: ${courseId}`
            });
        }
       
        // Fetch or initialize course progress
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,  // Note: changed from courseID to courseId
            userId: userId       // Note: changed from userID to userId
        });

        // console.log("Course Progress:", courseProgress);

        // If no progress exists, create one
        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completeVideo: []
            });
            // console.log("Created new course progress:", courseProgress);
        }

        // Calculate total duration
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.SubSection.forEach((subSection) => {
                const timeDurationInSecond = parseInt(subSection.timeDuration) || 0;
                totalDurationInSeconds += timeDurationInSecond;
            });
        });

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completeVideos: courseProgress.completeVideos || []
            }
        });
    } catch (error) {
        console.error("Error in getFullCourseDetails:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Function to get all courses of a particular instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get User Id from request object
        const instructorId = req.user.id

        // Find All Courses of the instructor
        const instructorCourses = await Course.find({ instructor: instructorId }).sort({ createdAt: -1 })
            .populate({
                path: "courseContent",
                populate: {
                    path: "SubSection"
                }
            })


        // return all courses of the instructor
        res.status(200).json({
            success: true,
            message: "All Courses Fetched",
            data: instructorCourses
        })
    } catch (error) {
        // Handle any errors that occur during the fetching of the courses
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
            error: error.message,
        });
    }
}

// Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        // find the course
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ message: "Course Not Found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId }
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete Sub-section of section
            const section = await Section.findById(sectionId)

            if (section) {
                const subSections = section.SubSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        // Delete Course id from category
        await Category.findByIdAndUpdate(course.category._id, {
            $pull: { courses: courseId }
        })

        // Delete Course id from instructor
        await User.findByIdAndUpdate(course.instructor._id, {
            $pull: { courses: courseId }
        })

        return res.status(200).json({
            success: true,
            message: "Course Deleted Successfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}

// search course by tilte, description and tags array
exports.searchCourse = async (req, res) => {
    try {
        const { searchQuery } = req.body
        // console.log("Search Query : ", searchQuery)
        const courses = await Course.find({
            $and: [
                { instructor: { $exists: true, $ne: null } }, // Ensure instructor exists
                {
                    $or: [
                        { courseName: { $regex: searchQuery, $options: 'i' } },
                        { courseDescription: { $regex: searchQuery, $options: 'i' } },
                        { tag: { $in: [new RegExp(searchQuery, 'i')] } } // Better array search
                    ]
                }
            ]
        })
            .populate({
                path: "instructor",
                select: "firstName lastName email image"
            })
            .populate({
                path: "category",
                select: "name description"
            })
            .populate("ratingAndReviews")
            .lean(); // Better performance than .exec()


        return res.status(200).json({
            success: true,
            data: courses
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Mark Lecture as completed
exports.markLectureAsComplete = async (req, res) => {
    try {
        const { courseId, subSectionId } = req.body
        const userId = req.user.id

        // Find or create course Progress
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        })

        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [subSectionId]
            });
        } else {
            if (courseProgress.completeVideos.includes(subSectionId)) {
                return res.status(200).json({
                    success: true,
                    message: "Lecture already marked as complete",

                });
            }
            // Add to completed Videos
            courseProgress.completeVideos.push(subSectionId)
        }
        await courseProgress.save()

        await User.findByIdAndUpdate(userId, {
            $addToSet: { courseProgress: courseProgress._id }
        })

        return res.status(200).json({
            success: true,
            message: "Lecture Marked as Complete",
            data: {
                progressPercentage: courseProgress.progressPercentage
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}