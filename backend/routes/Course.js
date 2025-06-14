// Import the required models
const express = require("express")
const router = express.Router()

// Import the controllers

// Course Controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    editCourse,
    getInstructorCourses,
    getFullCourseDetails,
    deleteCourse,
    searchCourse,
    markLectureAsComplete,
    viewAllCourses
} = require("../controllers/Course")

// Category Controllers Import
const { createCategory,
    showAllCategory,
    categoryPageDetails,
    addCourseToCategory,
    deleteCategory
} = require("../controllers/Category")

// Section Controller Import
const {
    createSection,
    updateSection,
    deleteSection
} = require('../controllers/Section')

// Sub-Section Controller Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require('../controllers/SubSection')

// Rating Controller Import
const {
    createRating,
    getAverageRating,
    getAllRating
} = require("../controllers/RatingAndReview")

// importing middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

// ****************************************************************************************************************************************************************
//                                               Course routes
// ****************************************************************************************************************************************************************

// Course can only be created by instructors
router.post('/createCourse', auth, isInstructor, createCourse)

// add a section to a course
router.post('/addSection', auth, isInstructor, createSection)

// update a Section
router.post('/updateSection',auth, isInstructor, updateSection)

// Delete a section
router.post('/deleteSection', auth, isInstructor, deleteSection)

// Add a sub Section to a section
router.post('/addSubSection', auth, isInstructor, createSubSection)

// Edit Sub Section
router.post('/updateSubSection', auth, isInstructor, updateSubSection)

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

// Get All Registered Courses
router.get("/getAllCourses", getAllCourses)

// Get Details for Specific courses
router.post("/getCourseDetails", getCourseDetails)

// edit a course
router.post("/editCourse", auth, isInstructor, editCourse )

// get all courses of specific instructor
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourses)

// get full course details
router.post('/getFullCourseDetails', auth, getFullCourseDetails)

// delete a course
router.delete("/deleteCourse", auth, deleteCourse)

// search courses
router.post('/searchCourse', searchCourse)

// mark lecuture as complete
router.post('/updateCourseProgress', auth, isStudent, markLectureAsComplete)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin

router.post('/createCategory', auth, isAdmin, createCategory)
router.delete('/deleteCategory', auth, isAdmin, deleteCategory)
router.get('/showAllCategories', showAllCategory)
router.post('/getCategoryPageDetails', categoryPageDetails)
router.post('/addCourseToCategory',auth, isInstructor, addCourseToCategory)
router.get('/viewAllCourses',viewAllCourses)

// ****************************************************************************************************************************************************************
//                                                  Rating and Review
// ****************************************************************************************************************************************************************
router.post('/createRating', auth, isStudent, createRating)
router.get('/getAverageRating', getAverageRating)
router.get('/getReviews', getAllRating)

module.exports = router