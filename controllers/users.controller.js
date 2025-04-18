// Createing Users Class Here...
require("dotenv").config("../.env");
const UserModel = require("../models/user.model");
const { createHash, compareHash } = require("../tools/password.hashing");
const { encodeJWT, decodeJW } = require("../tools/jwt.config");
const setCookie = require("../configs/set.cookie");

class UserController {
    async createUser(req, res) {
        const { name, email, password } = req.body;
        try {
            if (!name && !email && !password)
                throw new Error("All Fields Are Required !");
            const existUser = await UserModel.findOne({ email });
            if (existUser) throw new Error("User Already Registered !");
            const hashed = await createHash(password);
            const newUser = await new UserModel({
                name,
                email,
                password: hashed
            });
            await newUser.save();
            return res.json({
                code: 201,
                success: true,
                user_id: newUser._id,
                message: "User Created Successfully"
            });
            //const token = await encodeJWT({ id: newUser._id, name, email });
            //setCookie(res, token, { id: newUser._id, token });
        } catch (error) {
            return res.status(505).json({
                success: false,
                message: error.message || "Something Went Wrong"
            });
        }
    }
    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            if (!email && !password) throw new Error("All Fields Are Required");
            const existUser = await UserModel.findOne({ email });
            if (existUser) {
                const matched = await compareHash(password, existUser.password);
                if (!matched) throw new Error("Invalid Email Or Password");
                const token = await encodeJWT({
                    id: existUser._id,
                    name: existUser.name,
                    email
                });
                setCookie(res, token, { id: existUser._id, token });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Invalid Credentials"
                });
            }
        } catch (error) {
            return res.status(505).json({
                code: 403,
                status: false,
                message: error.message || "Something Went Wrong"
            });
        }
    }
    async getMe(req, res) {
        const id = req.user._id;
        try {
            const user = await UserModel.findById(id).select("-password");
            if (user) {
                return res.status(200).json({
                    user,
                    success: true
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "No User Found In This Server !"
                });
            }
        } catch (error) {
            return res.status(505).json({
                success: false,
                message: error.message || "Something Went Wrong"
            });
        }
    }
}

module.exports = new UserController();
