import UserModel from "../models/Auth.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { z } from 'zod';



//Our zod schema
const userSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const Register = async (req, res) => {
  try {
    const validation = userSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.errors, // This will tell you what validation failed
      });
    }

    const { username, email, password } = validation.data; // Use validation.data

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists, Please Login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const NewUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      User: NewUser,
    });
  } catch (error) {
    console.error("Error during registration:", error.message); // Log the error message
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message, // Include the error message in the response for better debugging
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Await the asynchronous call to find the user
    const findUser = await UserModel.findOne({ email }); 

    // Check if user exists
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register.",
      });
    }

    // Check if the password is correct
    const passwordCheck = await bcrypt.compare(password, findUser.password);

    if (!passwordCheck) {
      return res.status(401).json({ // Use 401 for unauthorized
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Create a JWT token
    const token = await jwt.sign(
      {
        userId: findUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    // Set cookie with the token
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Change to true in production
      maxAge: 3 * 24 * 3600 * 1000, // 3 days
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: findUser,
      token,
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message, // Include error message for debugging
    });
  }
};


const Logout = async(req,res)=>{
  try {
    res.clearCookie('token');
    return res.status(200).json({
      success : true,
      message : "Logout Successfull"
    })
  } catch (error) {
    
  }

}

export default {Register,Logout ,Login};
