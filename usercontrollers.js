const userModel = require("userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginController = async (req, res) => {
    try {
        const existUser = await userModel.findOne({ email: req.body.email });
        if (!existUser) {
            return res.status(201).json({
                success: false,
                message: "incorrect email or password"
            })
        }
        const match = await bcrypt.compare(req.body.password, existUser.password);
        if (!match) {
            return res.status(201).json({
                success: false,
                message: "incorrect password"
            })
        }
        const token = jwt.sign({ id: existUser._id }, process.env.JWT_KEY, { expiresIn: '1d' });
        return res.status(200).json({
            success: true,
            message: "user logged in successfully",
            data: existUser,
            token: token
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Please register",
            error
        })
    }
}
const registerController = async (req, res) => {
    try {
        const existUser = await userModel.findOne({ email: req.body.email });
        if (existUser) {
            return res.status(200).json({
                success: false,
                message: "user already registered"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "user registered successfully",
            data: newUser
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "something went wrong",
            success: false,
            error
        })
    }
}
module.exports = { loginController, registerController };