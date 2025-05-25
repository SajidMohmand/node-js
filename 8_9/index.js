const url = require("url")
const http = require("http")
const fs = require("fs")

const server = http.createServer((req,res)=>{


    if(req.url === '/favicon.ico') return res.end()
    const pakUrl = url.parse(req.url,true)

    console.log(pakUrl);
    

    switch(pakUrl.pathname){
        case "/":
            res.end("Home Page");
            break;
        case "/about":
             const name = pakUrl.query.name;
            res.end(`About Page:  ${name}`)
            break;
        default:
            res.end("404 Not Found")

    }
})


server.listen("3000",()=>{
    console.log("successfully connected");

})

