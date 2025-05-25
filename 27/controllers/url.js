
const URL = require("../models/urls")
const shortId = require("shortid")



async function handleCreateShortUrl(req,res){

    if(!req.body.url){
        return res.status(400).json({
            error: "url is required"
        })
    }
    const id = shortId(8);
    await URL.create({
        shortId: id,
        redirectURL: req.body.url,
    })

    return res.json({ message: "Short URL created", id });

}


async function handleGetUrl(req,res){
    const id = req.params.id

    const url = await URL.findOne({
        shortId: id
    })

    if(url) return res.redirect(url.redirectURL)
    return res.json({error: "Not find url"})

    
}

async function handleGetAllUrls(req,res){

    const allUrls =await URL.find({})

    if(!allUrls) return res.end("Not have urls in DB")
    res.json(allUrls);
}


async function createShortUrl(originalUrl) {


   const id = shortId(8);
    const newUrl = await URL.create({
        shortId: id,
        redirectURL: originalUrl,
    });
    console.log("capital ",newUrl.shortId);
    
    return newUrl.shortId;
}
module.exports = {
    handleCreateShortUrl,
    handleGetAllUrls,
    createShortUrl,
    handleGetUrl,
};
