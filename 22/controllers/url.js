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

    res.render("home", {
        id: id
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

async function handleGetAllShortId(req,res){
    const result = await URL.find({})

    console.log(result);
    
    return res.status(200).json(result)
}
async function handleGetAndUpdateVisitedHistoryOfUrl (req,res){
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    },
    )

    res.redirect(entry.redirectURL)
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleGetAllShortId,
    handleGetAndUpdateVisitedHistoryOfUrl,
}