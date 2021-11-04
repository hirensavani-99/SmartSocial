const Post = require('../models/post')
const router = require('express').Router()
const User = require('../models/Client')
const multer = require('multer')
const auth = require('../Auth')
const sharp = require('sharp')



const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg|mov)$/)) {
            return cb(undefined, true)
        }
        else {
            return cb(new Error('this is not image file'))
        }


    }

})

//
router.post("/", auth, upload.single('avatar'), async (req, res) => {
    console.log(req.body);
    const newPost = new Post(req.body)
    const buffer = await sharp(req.file.buffer).resize({ width: 500, height: 500 }).png().toBuffer()

    newPost.desc = await req.body.desc;
    newPost.img = buffer;
    newPost.userId = req.user._id

    try {
        const savePost = await newPost.save()

        res.status(200).send(savePost)
    } catch (e) {
        res.status(500).send(e)
    }



})

//update a post
router.put('/:id', auth, upload.single('avatar'), async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)

        if (post.userId == req.user._id) {
            const buffer = await sharp(req.file.buffer).resize({ width: 1000, height: 1000 }).png().toBuffer()

            post.desc = await req.body.desc;
            post.img = buffer;

            await post.save()
            await post.updateOne({ $set: req.body });

            res.status(200).send("post has been updated")

        } else {
            res.status(400).send("You can update your posts only.")
        }
    }
    catch (e) {

        res.status(500).send(e)
    }
})

//delete a post 
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId == req.user._id) {
            await post.deleteOne();
            res.status(200).send("post has been deleted")

        } else {
            res.status(400).send("You can delete your posts only.")
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
})

//like a post
router.put("/:id/like", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(400).send("post with the postId doesnt exist")
        }


        if (!post.likes.includes(req.user._id)) {
            await post.updateOne({ $push: { likes: req.user._id } })

            return res.status(200).send(post.likes)
        } else {
            console.log('s2');
            await post.updateOne({ $pull: { likes: req.user._id } })

            return res.status(200).send(post.likes)
        }




    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

//get a post
router.get('/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)

        res.status(200).send(post)

    } catch (e) {
        res.status(500).send(e)
    }
})

//get timeline posts
router.get('/timeline/all', auth, async (req, res) => {

    try {
        const currentUser = req.user

        const userPost = await Post.find({ userId: currentUser._id })

        const friendPost = await Promise.all(
            currentUser.following.map(friendId => {

                return Post.find({ userId: friendId })
            })
        )

        res.status(200).send(userPost.concat(...friendPost))
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

})


//get user all posts
router.get('/profile/:username', auth, async (req, res) => {

    try {
        const user = await User.findOne({ userName: req.params.username })



        const userPost = await Post.find({ userId: user._id })

        res.status(200).send(userPost)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

})

module.exports = router;