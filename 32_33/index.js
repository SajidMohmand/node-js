const express = require("express")
const http = require("http")
const path = require("path")
const {Server} = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Socket io
io.on("connection", (socket)=>{

    socket.on("user-message", (message)=>{
        console.log("New Message: ",message);
        io.emit("message", message)
        
    })
    console.log("A new user has connected ",socket.id);
    
})



app.use(express.static(path.resolve("./public")))

app.get("/" ,(req,res)=>{
    res.sendFile("./public/index.html")
})



const PORT = 9000
server.listen(PORT, ()=> console.log("Server Listen on Port 9000"))

