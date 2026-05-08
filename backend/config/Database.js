const mongoose = require("mongoose")
require('dotenv').config()

exports.dbConnect = () => {
    // Log the connection string (without password)
    const dbUrl = process.env.DB_URL;
    const sanitizedUrl = dbUrl.replace(/:([^:@]+)@/, ':****@');
    console.log("Connecting to:", sanitizedUrl);
    
    // Extract database name for logging
    const dbName = dbUrl.split('/').pop().split('?')[0];
    console.log("Database Name:", dbName);
    
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Database Connected Successfully");
            console.log("Using Database:", mongoose.connection.name);
        })
        .catch((err) => {
            console.log(`Error While Connecting in Database ${err}`);
            console.error(err);
            process.exit(1);
        })
};