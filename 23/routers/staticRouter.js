const express = require("express")
const URL = require("../models/url")
const { restrictTo } = require("../middlewares/auth")
const router = express.Router()


router.get("/admin/urls", restrictTo(["ADMIN"]), async (req,res)=>{
    const allurls = await URL.find({}).populate("createdBy");
    
    console.log(allurls);
    
    return res.render("home", {
        urls: allurls,
        role: "ADMIN",
    })
})


router.get("/", restrictTo(["NORMAL","ADMIN"]) ,async(req,res)=>{

    // if(!req.user) return res.redirect("/login")
    const allUrls = await URL.find({createdBy: req.user._id})

    return res.render("home",{
        urls: allUrls,
        user: req.user,
    })
})


router.get("/signup", (req,res)=>{

    return res.render("signup")
})

router.get("/login", (req,res)=>{
    return res.render("login")
})

module.exports = router
