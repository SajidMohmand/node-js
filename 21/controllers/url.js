const shortid = require("shortid");

const URL = require("../models/url")

async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    
    if(!body.url){
        return res.status(400).json({
            error: "url is required"
        })
    }

    const id = shortid(8)

    await URL.create({
        shortId: id,
        redirectURL: body.url,
        visitHistory: [],

    })

    return res.json({
        id: id,
    })
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;

    const result =await URL.findOne({shortId})
    res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}