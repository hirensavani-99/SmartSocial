const Conversation = require('../models/conversation')
const router = require('express').Router()
const auth = require('../Auth')
const mongoose = require("mongoose")

//create new conversation

router.post("/", auth, async (req, res) => {

    console.log('1');
    const newConversation = new Conversation({
        members: [mongoose.Types.ObjectId(req.body.otherPerson), req.user._id]
    })
    try {
        console.log('2');
        const conversation = await Conversation.find({
            "$or": [
                { "members": [mongoose.Types.ObjectId(req.body.otherPerson), req.user._id] },
                { "members": [req.user._id, mongoose.Types.ObjectId(req.body.otherPerson)] }
            ]
        })
        console.log('3');
        console.log(conversation);
        console.log(conversation.length);
        if (conversation.length == 0) {
            console.log(conversation.length);
            console.log('4');
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation)


        } else {
            console.log('5');
            res.status(200).json(conversation)

        }


    } catch (e) {

        res.status(500).send(e)
    }
})


//get conversation

router.get("/", auth, async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.user._id] }
        })

        res.status(200).send(conversation)
    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router