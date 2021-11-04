const mongoose = require('mongoose')
const validator = require('validator')



const ConversationSchema = mongoose.Schema({
    members: {
        type: Array
    }
}, { timestamps: true })


const Conversation = mongoose.model('Conversation', ConversationSchema)

module.exports = Conversation;