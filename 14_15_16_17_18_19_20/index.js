const express = require("express")
const userRouter = require("./routes/user")
const {connectMongoDb} = require("./connection")
const {logReqRes} = require("./middlewares/index")

const app = express()

const PORT = 27017
 

app.use(express.urlencoded({
    extended:true
}))

app.use(logReqRes("log.txt"))

app.use("/user", userRouter)

connectMongoDb("mongodb://127.0.0.1:27017/user_data").then((_)=>{
    console.log("mongoDB connected.");
})

app.listen(PORT, ()=>{
    console.log(`Successfully connected to port: ${PORT}`);
})








