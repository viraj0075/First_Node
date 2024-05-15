import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


//in pass word you have to include the ascii valuer of the special character not like viraj@123 --> viraj%40123 likewise
//it would give the object having the mongo db instance



const connectDB = async () => {
    try {
        const connectionInsatnce = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        // console.log(connectionInsatnce,"This is Connection INstance");
        console.log(`MongoDB is Connected SuccessFully ${connectionInsatnce.connection.host}`)

    } catch (error) {
        console.log(error,"Error in Db Connection");
        process.exit(1);
        throw error;
    }
};
export default connectDB;