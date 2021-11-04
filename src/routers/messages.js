const Message = require('../models/message')
const router = require('express').Router()
const auth = require('../Auth')

//add message

router.post('/', auth, async (req, res) => {

    const message = new Message(req.body)
    try {
        const savedMessage = await message.save()
        res.status(200).send(savedMessage)
    } catch (e) {
        res.status(500).send(e)
    }
})
//get message

router.get('/:conversationId', auth, async (req, res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).send(message)
    } catch (e) {

    }
})
module.exports = router