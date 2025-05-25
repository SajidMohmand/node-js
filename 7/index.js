const http = require("http")
const file = require("fs")

// const server = http.createServer((req,res)=>{
//     const log = `${Date.now()}`

//     file.readFile("contact.txt", "utf-8", (err,data)=>{

//         console.log(req);

//         res.end(data)
        
//     })

// })


const server = http.createServer((req,res)=>{

    file.appendFile("contact.txt", `${req.url} : new Request Arrive\n`, (err,data)=>{

        switch (req.url) {
            case "/":
                res.end("Welcome to home page")
                break;
            case "/about":
                res.end("Sajid Ali Khan")
                break
            default:
                res.end("404 user not find");
        }
    })
})

server.listen("3000", ()=>{
    console.log("successfully connected server with port: 3000");
})


