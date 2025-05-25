const express = require("express")
const {handleCreateShortUrl,handleGetAllUrls,handleGetUrl} = require("../controllers/url")

const router = express.Router();


router.route("/").post(handleCreateShortUrl).get(handleGetAllUrls)
router.get("/url/:id", handleGetUrl)

module.exports = router;
