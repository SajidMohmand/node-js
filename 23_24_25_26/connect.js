const mongoose = require("mongoose")

async function connectMongoDb(filename) {
    
    return mongoose.connect(filename)
}

module.exports = {
    connectMongoDb,
}