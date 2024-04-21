require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT;

const jsondata  = {
    "browsers": {
      "firefox": {
        "name": "Firefox",
        "pref_url": "about:config",
        "releases": {
          "1": {
            "release_date": "2004-11-09",
            "status": "retired",
            "engine": "Gecko",
            "engine_version": "1.7"
          }
        }
      }
    }
  }
  


app.get("/",(req,res) =>{
    res.send("Hellon Viraj");
})

app.get("/twitter",(req,res) =>{
    res.send("Hello Viraj this is Twitter");
})

app.get("/chaiaurcode",(req,res) =>{
    res.send("<h1>This is Chai aur code </h1>");
})


app.get("/jsondata",(req,res) =>{
    res.json(jsondata);
})

app.listen(port,()=>{
    console.log(`Your Server is listening on port ${port}`);
    console.log("Server is Running")
})