const express = require("express")

const router = express.Router()

const {handleGenerateNewShortUrl,handleGetAnalytics,handleGetAllShortId,handleGetAndUpdateVisitedHistoryOfUrl,} = require("../controllers/url")

router.route("/").post(handleGenerateNewShortUrl).get(handleGetAllShortId)

router.get("/:shortId", handleGetAndUpdateVisitedHistoryOfUrl)
router.get("/analytics/:shortId", handleGetAnalytics)
module.exports = router

