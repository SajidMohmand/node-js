const express = require("express")
const router = express.Router()
const Blog = require("../models/blog")
const Comment = require("../models/comment")
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  }
})
const upload = multer({ storage: storage })

router.get("/add-new", (req,res)=>{
    return res.render("addBlog", {
        user: req.user
    })
})

router.post("/",upload.single("coverImage"),async (req,res)=>{
    
    const {title,body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const findblog = await Blog.findById(id).populate("createdBy");

        const comments = await Comment.find({blogId: req.params.id}).populate("createdBy")
        if (!findblog) {
            return res.status(404).send("Blog not found");
        }

        return res.render("displayBlog", {
            user: req.user,
            blog: findblog,
            comments,
        });
    } catch (err) {
        console.error("Error fetching blog:", err);
        return res.status(500).send("Internal Server Error");
    }
});


router.post("/comment/:blogId", async (req,res)=>{
    await Comment.create({
         content: req.body.content,
         blogId: req.params.blogId,
         createdBy: req.user._id,
    })

    return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports = router;
