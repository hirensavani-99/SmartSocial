const mongoose = require('mongoose')
const validator = require('validator')



const PostsSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: Buffer
    },
    likes: {
        type: Array,
        default: []
    },
}, { timestamps: true })


const Post = mongoose.model('post', PostsSchema)

module.exports = Post;