const express = require('express')

const userRoutes = require('./routes/User')
const profileRoutes = require('./routes/Profile')
const paymentRoutes = require('./routes/Payments')
const courseRoutes = require('./routes/Course')
const contactUs = require("./routes/ContactUs")

const database = require('./config/Database')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {cloudinaryConnect} = require("./config/Cloudinary")
const fileUpload = require("express-fileupload")
const dotenv = require('dotenv')

dotenv.config()

// connect to database
database.dbConnect();
const PORT = process.env.PORT || 8080;
const app = express()


// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: [
            "https://study2success.vercel.app",
            "http://192.168.108.178:5173",
            "http://localhost:5173"
        ],
        credentials: true
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp/'
    })
)

// cloudinary connection
cloudinaryConnect()

// routes
app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/profile',profileRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/payments',paymentRoutes)
app.use('/api/v1/contact',contactUs)

// default route
app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"Welcome To Study2Succes Server..."
    })
})

app.listen(PORT,()=>{
    console.log("APP RUNNING AT ",PORT)
})