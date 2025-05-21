const express = require("express")
const {connectToDB} = require("./connect")
const urlRoute = require('./routers/url')
const URL = require("./models/url")

const app = express()

const PORT = 3000


app.use(express.json())


app.use("/url", urlRoute)
app.get("/:shortId", async(req,res)=>{

    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory :{
                    timestamp: Date.now()
                }
            }
        }
    )

    return res.redirect(entry.redirectURL);

})

connectToDB("mongodb://localhost:27017/short-url-project").then(() => {
  console.log("connect mongoDB");
    
})

app.listen(PORT, ()=>{
    console.log(`Successfully connected on PORT: ${PORT}`);
})

