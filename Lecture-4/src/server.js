// import mongoose from "mongoose";
// import {DB_NAME} from "./constants"

// ;(async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//     } catch (error) {
//         console.log(error,"This is Error in the database connection");
//         throw error;
//     }
// })()

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";


dotenv.config({
    path:"./env"
})
connectDB().then(() => {
     app.listen (process.env.PORT || 8000 , () =>{
        console.log(`Server is Listning on the port : ${process.env.PORT}`)
     })
}).catch((err) => ("Error in the mongoDB connection",err));