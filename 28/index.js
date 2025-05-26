const express = require("express")
const path = require("path")
const multer  = require('multer')

const app = express()


app.use(express.json())

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads');
    },

    filename: function (req, file, cb) {
        cb(null,`${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage})
app.get("/", (req,res)=>{
    return res.render("homepage")
})

app.post("/upload",upload.single("profileImage"), (req,res)=>{

    console.log(req.body);
    console.log(req.file);
    
    return res.redirect("/")
})

const PORT = 8000

app.listen(PORT, ()=>{
    console.log("Server listen on PORT ",PORT);
})