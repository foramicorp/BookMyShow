
// IMPORTING REQUIRED MODULES
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT VERIFICATION MIDDLEWARE
const isToken = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

// CHECK IF THE TOKEN IS PRESENT OR NOT
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }

    try {
// DECODE THE JWT
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;
        console.log(decode.userId);
        next();
        
    } catch (error) {
        
        return res.status(401).json({ message: "Error Verifying Token" });
    }
};

// EXPORTING THE MIDDLEWARE
module.exports = isToken;