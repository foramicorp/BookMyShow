// IMPORTING JWT
const jwt = require("jsonwebtoken");

// IMPORTING BCRYPT
const bcrypt = require("bcrypt");

// IMPORTING USER MODEL
const User = require("../Model/user.model");

// CREATING USER REGISTER
const createUser = async (req , res) =>{
    try {
    const{First_Name,Last_Name,Phone_Number,Role,Email,Password} = req.body;

// HASHING THE PASSWORD USING BCRYPT

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

// CHECKING IF USER ALREADY EXIST BY EMAIL

    let isUserExist = await User.findOne({Email : Email});
    if(isUserExist){
        return res.status(400).json({message : 'User already exist'});
    } else {

// CREATING NEW USER AND SAVING IT TO THE DATABASE
        const user = await User.create({First_Name,Last_Name,Phone_Number,Role,Email,Password:hashedPassword});
        return res.status(201).json(user);
    }
// CATCHING ANY OTHER ERROR
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Server Error'});
    
}}
// GETTING ALL USERS 
const getAllUser = async (req, res) => {
    const user = await User.find().select('-Password');
    res.status(201).json(user);
}
// GETTING USER BY ID WITH ONLY IF LOGGED IN (JWT AUTHENTICATION)
const getUserById = async (req, res) => {
    try {
        console.log("Decoded Token Data:", req.user);

// EXTRACTING USER ID FROM THE DECODED TOKEN DATA
        let user_id = req.user.userId;
        console.log("Extracted UserId from Token:", user_id);

// FINDING USER BY ID AND RETURNING IT
        let user = await User.findById(user_id).select("-Password");

// IF USER NOT FOUND, RETURNING NOT FOUND STATUS
        if (!user) {
            console.log("User not found in database.");
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in getUserById:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// LOGIN USER
const loginUser = async (req,res) => {

// CHECKING IF USER ALREADY EXIST BY EMAIL

    try {
        const {Email, Password} = req.body;
        const isExists = await User.findOne({Email : Email});
        if(!isExists){
            return res.status(400).json({message : 'User not found'});
        }    

// COMPARING THE PASSWORD WITH THE HASHED PASSWORD 
        const isMatched = await bcrypt.compare(Password, isExists.Password);
        if(!isMatched){
            return res.status(400).json({message : 'Incorrect password'});
        }

// GENERATING JWT TOKEN
        const payload = {
            userId : isExists._id,
            First_Name : isExists.First_Name,
            Last_Name : isExists.Last_Name,
            Role : isExists.Role,
            Phone_Number : isExists.Phone_Number,
            Email : isExists.Email,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '1h'});

        console.log(payload);
        console.log("Token generated : ", token);

        res.status(200).json({ message: "Login successful", token });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({message : 'Server Error'});
        }


    }

// EXPORTING THE FUNCTIONS
module.exports = {createUser, loginUser, getUserById  , getAllUser};
