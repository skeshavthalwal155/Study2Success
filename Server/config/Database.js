const mongoose = require("mongoose")
require('dotenv').config()

exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL,{
        ssl: true,
        tlsAllowInvalidCertificates: true, // Bypass validation
    })
        .then(() => {
            console.log("Database Connected Successfully")
        })
        .catch((err) => {
            console.log(`Error While Connecting in Database ${err}`)
            console.error(err);
            process.exit(1);
        })
};