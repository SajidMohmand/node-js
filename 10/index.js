
const express = require("express")
const http = require("http")

const app = express()


app.get("/",(req,res)=>{

    res.send("Home Page")
})

app.get("/about",(req,res)=>{

    res.send("About Page")
})
app.get("/contact",(req,res)=>{

    res.send("Contact Page")
})



app.listen(3000,()=>{
    console.log("Server listen on Port 3000");
    
})





