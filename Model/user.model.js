const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    First_Name: String,
    Last_Name: String,
    Phone_Number: Number,
    Role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    },
    Email: String,
    Password: String

})

const User = mongoose.model("User",userSchema);

module.exports = User;