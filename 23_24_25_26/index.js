const express = require("express")
const {connectMongoDb} = require("./connect")
const urlRoute = require('./routers/url')
const URL = require("./models/url")
const path = require('path')
const staticRoute = require("./routers/staticRouter")
const userRoute = require("./routers/user")
const {checkForAuthentication,restrictTo} = require("./middlewares/auth")
const cookieParser= require('cookie-parser')

const app = express()

app.set("view engine", "ejs")
app.set('views', path.resolve("./views"))



app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthentication)

app.use("/url",restrictTo(["NORMAL","ADMIN"]) ,urlRoute)
app.use("/user", userRoute)
app.use("/",staticRoute)


 
const PORT = 3000

app.listen(PORT, ()=>{
    console.log("Successsfully connected to PORT: ",PORT);
})


connectMongoDb("mongodb://localhost:27017/short-url-project").then((_)=>{
    console.log("Mongodb connected")
})