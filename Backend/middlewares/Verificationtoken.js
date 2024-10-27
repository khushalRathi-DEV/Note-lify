import jwt from 'jsonwebtoken';
import UserModel from '../models/Auth.js';
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(403).json({ success: false, message: "Unauthorized. Please log in." });
    }

    // Verifying the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded || !decoded.userId) {                        // Checking if decoded and userId exist
      return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    }


    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found. Please register." });
    }

    // Assigning the user ID to request object
    req.userid = user._id;
     //console.log(user.username); 
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export { verifyToken };
