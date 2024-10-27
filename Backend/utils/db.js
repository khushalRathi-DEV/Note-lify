import mongoose from "mongoose";

const DbCon = async() => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");

  } catch (error) {
    console.log("Error connecting DB",error);
  }

};

export default DbCon