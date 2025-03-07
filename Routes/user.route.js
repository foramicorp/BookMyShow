const Router = require("express");
const {  getUserById, getAllUser, createUser, loginUser } = require("../Controller/user.controller");
const isToken = require("../Middleware/auth");

const userRouter = Router();

userRouter.get("/getalluser", getAllUser);
userRouter.post("/create", createUser );
userRouter.post("/login", loginUser);
userRouter.get("/:userId" , isToken ,getUserById);

module.exports = userRouter;