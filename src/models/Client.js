const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const ClientSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 7,
        max: 25
    },
    profilePicture: {
        type: Buffer

    },
    coverPicture: {
        type: Buffer

    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }

}, {
    timestamps: true
})



ClientSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, "smartsocial");
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token;
}

ClientSchema.statics.findByCredentials = async (email, password) => {
    const user = await Client.findOne({ email })
    if (!user) {
        throw new Error('id  password wrong')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        throw new Error('id or password wrong')
    }
    return user
}

const Client = mongoose.model('client', ClientSchema)

module.exports = Client;