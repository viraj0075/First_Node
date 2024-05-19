import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
const app =  express();

//only Allowed origin
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN
    }
))
//for the limit the Size of the JSON
app.use(express.json({limit:"16kb"}))
//for the url encoded to the spedfic object 
// here we can give th nested object.
app.use(express.urlencoded({extended:true,limit:"16kb"}));
//for store the pdf file in the server
app.use(express.static("public"))
app.use(cookieParser());



//route import  is here only
import userRoute from "./routes/user.route.js";
//route declartion
// the req would be go like this http://localhost:3000/users/login
// the req would be go like this http://localhost:3000/users/resiter
//this is defined in the routes.
app.use("/api/v1/users",userRoute);



export default app;


