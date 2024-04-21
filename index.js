require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT;


app.get("/",(req,res) =>{
    res.send("Hellon Viraj");
})

app.get("/twitter",(req,res) =>{
    res.send("Hello Viraj this is Twitter");
})

app.get("/chaiaurcode",(req,res) =>{
    res.send("<h1>This is Chai aur code </h1>");
})


app.listen(port,()=>{
    console.log(`Your Server is listening on port ${port}`);
    console.log("Server is Running")
})