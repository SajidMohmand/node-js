const {Client, GatewayIntentBits} = require("discord.js")
const {connectDB} = require("./connection")
const express = require("express")
import 'dotenv/config'; 


const app = express()

const urlRouter = require("./routers/url")
const { createShortUrl } = require("./controllers/url")

app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))





const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});


client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("create")) {
        const url = message.content.split("create ")[1];

        if (!url) {
            return message.reply("❌ Please provide a valid URL.");
        }

        try {
            const shortid = await createShortUrl(url);
            const shortUrl = `http://localhost:3001/url/${shortid}`;
            console.log(shortid);

            return message.reply({
                content: `✅ Short URL generated: ${shortUrl}`
            });
        } catch (error) {
            console.error(error);
            return message.reply("❌ Error creating short URL.");
        }
    }

    return message.reply({
        content: "Hi From Bot",
    });
});


client.on("interactionCreate", (interaction)=>{
    interaction.reply("Capital is here")
})

client.login(process.env.DISCORD_TOKEN)

const PORT = 3001;

app.listen(PORT, ()=>{
    console.log("Successfully connected to PORT ",PORT); 
})
app.use("/", urlRouter)

connectDB("mongodb://localhost:27017/Discord_bot").then((result) => {
    console.log("DB connected");
      
})
