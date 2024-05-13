import mongoose, { modelNames } from "mongoose";

const doctorSchema = new mongoose.Schema({

},{timestamps:true});

export const Doctor = mongoose.model("Doctor",doctorSchema)