import express from "express"
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
app.use(express.urlencoded({extended:true}));
//for store the pdf file in the server
app.use(express.static("public"))
export default app;