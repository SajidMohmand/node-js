const express = require("express")
const {connectMongoDb} = require("./connect")
const urlRoute = require('./routers/url')
const URL = require("./models/url")
const path = require('path')
const staticRoute = require("./routers/staticRouter")

const app = express()

app.set("view engine", "ejs")
app.set('views', path.resolve("./views"))


app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

const PORT = 3000

app.listen(PORT, ()=>{
    console.log("Successsfully connected to PORT: ",PORT);
})

app.use("/url", urlRoute)
app.use("/", staticRoute)

connectMongoDb("mongodb://localhost:27017/short-url-project").then((_)=>{
    console.log("Mongodb connected")
})