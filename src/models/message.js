const mongoose = require('mongoose')
const validator = require('validator')



const MessageSchema = mongoose.Schema({

    conversationId: {
        type: String
    },
    sendId: {
        type: String
    },
    text: {
        type: String
    }

}, { timestamps: true })


const Meassage = mongoose.model('Meassage', MessageSchema)

module.exports = Meassage;