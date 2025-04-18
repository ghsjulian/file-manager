const express = require("express")
const router = express.Router()
const UserController = require("../controllers/users.controller")
const isLogin = require("../middlewares/is.login")


router.post("/user/create-user",UserController.createUser) 
router.post("/user/login-user",UserController.loginUser) 
router.get("/user/get-me",isLogin,UserController.getMe) 


module.exports = router