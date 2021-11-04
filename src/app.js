const express = require('express')
require('./db/mongoose')
const app = express()
const clientRouter = require('./routers/user')
const Post = require('./routers/post')
const Conversation = require('./routers/conversations')
const Message = require('./routers/messages')
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(clientRouter)

app.use('/api/posts', Post)
app.use('/api/conversation', Conversation)
app.use('/api/message', Message)


app.listen(port, () => {
    console.log(`server is up to port :${port}`);
})