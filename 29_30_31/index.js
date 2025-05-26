const express = require("express")
const path = require("path")
const userRouter = require("./routers/user")
const blogRouter = require("./routers/blog")

const Blog = require("./models/blog")

const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require("./middlewares/authentication")
const app = express()
const PORT = 8000

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({
    extended: false,
}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))


app.get("/", async(req,res)=>{
    const allBlogs = await Blog.find({})
    res.render("home",{
        user: req.user,
        blogs: allBlogs,
    })
})

app.use("/user", userRouter)
app.use("/blog", blogRouter)



mongoose.connect("mongodb://localhost:27017/blog_project").then(()=>{
    console.log("Mongodb connected");
    
})
app.listen(PORT,()=> console.log(`Server Started at PORT: ${PORT}`))