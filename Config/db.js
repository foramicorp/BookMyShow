// REQUIRING MONGOOSE
const mongoose = require("mongoose");
// REQUIRING DOTENV
require("dotenv").config();

// CONNECTING TO MONGODB
const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URL)
    console.log("Connected to MongoDB");
}

// EXPORTING DBCONNECT
module.exports = dbConnect();