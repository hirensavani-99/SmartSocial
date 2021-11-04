const User = require("../models/Client")
const router = require("express").Router();
const bcrypt = require("bcrypt")
const auth = require("../Auth")
const multer = require('multer')
const sharp = require('sharp')

//upload

const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(undefined, true)
        }
        else {
            return cb(new Error('this is not image file'))
        }


    }

})

//usercreate 

router.post('/users', async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await new User({
        ...req.body,
        password: hashedPassword
    })
    try {

        await user.save()
        const token = await user.generateToken()

        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e);
        res.status(400).send("data filed are not enough")
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()

        res.status(200).send({ user, token })
    } catch (e) {

        res.status(400).send("something went wrong !")
    }
})

//getting user

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

//get friend

router.get("/friends", auth, async (req, res) => {
    try {
        const user = req.user
        const friend = await Promise.all(
            user.following.map(followerId => {
                return User.findById(followerId)
            })
        )

        let followerList = []
        friend.map(follower => {
            const { _id, userName, profilePicture } = follower
            followerList.push({ _id, userName, profilePicture })
        })
        res.status(200).send(followerList)
    } catch (e) {
        res.status(500).send("there are some problem !")
    }
})

//getting user by id
router.get("/user/:id", auth, async (req, res) => {
    const user = await User.findById(req.params.id)

    res.status(200).send(user)
})

//get all user 
router.get('/allUser', auth, async (req, res) => {
    const user = await User()
    res.status(200).send(user)
})

//find user by name
// router.get("/user/:username", auth, async (req, res) => {
//     const userName = req.params.username;
//     console.log(userName);

//     try {
//         const user = await User.find({ userName: userName })
//         res.status(200).send(user)
//     }
//     catch (e) {
//         console.log('error');
//        // res.status(400).send(e)
//     }

// })


//getting user by query
router.get("/user", auth, async (req, res) => {
    const userId = req.query.userId;
    const userName = req.query.username;

    try {
        const user = userId ? await User.findById(userId) :
            await User.findOne({ userName: userName })

        const { password, updatedAt, ...other } = user._doc
        res.status(200).send(other)

    } catch (e) {
        res.status(500).send("not found")
    }

})
//update user
router.put("/user/update", auth, async (req, res) => {

    const update = Object.keys(req.body)
    const allowUpdate = ['userName', 'email', 'password', 'profilePicture', 'coverPicure', 'followers', 'following', 'isAdmin', 'desc', 'city', 'from', 'relationship']
    const isValidOperation = update.every((update) => allowUpdate.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error: "something went wrong" })
    }

    try {

        update.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(404).send('something went wrong')
    }
})

//delete user
router.delete('/user/me', auth, async (req, res) => {

    try {
        await req.user.remove()

        res.status(200).send("user removed")
    }
    catch (e) {
        res.status(400).send("user doesnot exist")
    }

})


//follow a user
router.put("/user/follow", auth, async (req, res) => {

    if (req.body.userId != req.user._id) {
        try {

            const user = req.user;
            const currentUser = await User.findById(req.body.userId)

            if (!user.following.includes(req.body.userId)) {
                await user.updateOne({ $push: { following: req.body.userId } })
                await currentUser.updateOne({ $push: { followers: req.user._id } })

                res.status(200).send('user has been followed')
            } else {
                res.status(403).send('you are already follow this User')
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err)
        }
    } else {
        res.status(403).send('you cannot follow your self')
    }
})

//unfollow user
router.put("/user/unfollow", auth, async (req, res) => {

    if (req.body.userId !== req.user._id) {
        try {

            const user = req.user;
            const currentUser = await User.findById(req.body.userId)
            if (user.following.includes(req.body.userId)) {

                await user.updateOne({ $pull: { following: req.body.userId } })
                await currentUser.updateOne({ $pull: { followers: req.user._id } })

                res.status(200).send('user has been unfollowed')
            } else {
                res.status(403).send('you are already unfollow this User')
            }
        } catch (err) {
            console.log('err');
            res.status(500).send(err)
        }
    } else {
        res.status(403).send('you cannot unfollow your self')
    }
})


//profile picture:-
router.post("/profilePicture", auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 1000, height: 1000 }).png().toBuffer()
    req.user.profilePicture = buffer;
    try {
        const saveUser = await req.user.save()

        res.status(200).send(saveUser)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})



router.post("/coverPicture", auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 2000, height: 2000 }).png().toBuffer()
    req.user.coverPicture = buffer;
    try {
        const saveUser = await req.user.save()

        res.status(200).send(saveUser)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})
//background picture:-
router.post("/background", auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 1500, height: 1500 }).png().toBuffer()
    req.user.coverPicture = buffer;
    try {
        const saveUser = await req.user.save()
        res.status(200).send(saveUser)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})


//get profilepicture
router.get('/user/:id/avatar', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.profilePicture) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.status(200).send(user.profilePicture)
    } catch (e) {
        console.log(e);
        res.status(404).send(e)
    }
})
module.exports = router