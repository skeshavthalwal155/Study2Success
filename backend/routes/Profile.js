// Import the required modules
const express = require("express")
const router = express.Router()
const { auth, isInstructor, isAdmin } = require('../middleware/auth')

// Importing Controller
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard,
    getAllUser
} = require('../controllers/Profie')

// ****************************************************************************************************************************************************************
//                                                  Profile routes
// ****************************************************************************************************************************************************************

// Delete User Account
router.delete('/deleteProfile', auth, deleteAccount)

// Update User Profile
router.put('/updateProfile', auth, updateProfile)

// Get User Details
router.get("/getUserDetails", auth, getAllUserDetails)

// Get users
router.get('/getUsers',auth, isAdmin, getAllUser)

// Get Enrolled Courses
router.get('/getEnrolledCourses', auth, getEnrolledCourses)

// Update Display Profile Picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

//get instructor dashboard details
router.get("/getInstructorDashboardDetails", auth, isInstructor, instructorDashboard)

module.exports = router