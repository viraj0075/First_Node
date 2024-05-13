import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  //This will add the created at and updatedAt the end of the schema
  { timestamps: true }
);


//here the User would be store in the users in the Database of the mongo db 

export const user =  mongoose.model("User",userSchema);