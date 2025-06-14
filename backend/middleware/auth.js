const jwt = require('jsonwebtoken')
require('dotenv').config()

// auth
exports.auth = async (req, res, next) => {
    try {
        // fetching token from cookies, body, header
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");


        // if token missing, then return response
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Token is not found"
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("decode = ", decode);
            req.user = decode;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error:err.message,
            message: "Something went wrong while validating the token"
        })
    }
}

// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is Protected Route for Students only"
            })
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role can't be Verifed"
        })
    }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is Protected Route for Instructor only"
            })
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role can't be Verifed"
        })
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        // console.log("Account Type : ",req.user.accountType)
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is Protected Route for Admin only"
            })
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role can't be Verifed"
        })
    }
}