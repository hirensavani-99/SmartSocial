import React, { useState, useEffect, useContext } from 'react';
import { MoreVert, ThumbUpAlt, Comment } from "@material-ui/icons"
import classes from "./Post.module.css"
import { CheckCircle } from "@material-ui/icons"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom";
import nocover from "../../assets/assets/person/noCover.png"
import noprofile from "../../assets/assets/person/noAvatar.png"
import AuthContext from '../../store/auth-context'
import { CircularProgress } from "@material-ui/core"

//let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRiNzM3MDI2MzNlNDM4YzA5OGYwNjYiLCJpYXQiOjE2MjU0OTYwNDd9.7ststZUeqw7aczbXuw70_ONqRazXWfPP8KyqGTjO5zk"

function Post(props) {

    const authCtx = useContext(AuthContext)

    let token = authCtx.token

    const [like, setLike] = useState(props.post.likes.length)
    const [isLiked, setIsLike] = useState(false)
    const [User, setUser] = useState({})
    const [profile, setprofile] = useState()
    const [postimg, setPostimg] = useState()
    const currentUser = authCtx.user

    //   console.log(props.post.likes)x;

    useEffect(() => {
        setIsLike(props.post.likes.includes(currentUser._id))

    }, [currentUser._id, props.post.likes])

    useEffect(() => {
        const fetchUser = async () => {

            const res = await axios.get(`/user/${props.post.userId}`, { headers: { "Authorization": `Bearer ${token}` } })
            setUser(res.data);

            //transfer profile buffer to img buffer
            if (res.data.profilePicture) {

                let profileBuff = await new Buffer(res.data.profilePicture);
                let profileImg = await profileBuff.toString("base64")
                setprofile(`data:image/jpeg;base64,${profileImg}`)
            }


            //transfer buffer to img

            if (props.post.img) {

                let buff = await new Buffer(props.post.img);
                const img = await buff.toString('base64')

                setPostimg(`data:image/jpeg;base64,${img}`)
            }

        }
        fetchUser();



    }, [props.post.userId, props.post.img, props.post._id])

    const likeHandler = async () => {

        await fetch(`/api/posts/${props.post._id}/like`, {
            method: 'PUT',
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json())
            .then(data => console.log(data))


        setLike(isLiked ? like - 1 : like + 1);
        console.log(isLiked);
        setIsLike(!isLiked)

    }


    return (
        <div className={classes.post}>
            <div className={classes.wrapper}>
                <div className={classes.postTop}>
                    <div className={classes.postTopLeft}>
                        <Link to={`profile/ ${User.userName}`}>
                            <img className={classes.postProfileImge} src={profile !== undefined ? profile : noprofile} alt="" alt="" />
                        </Link>
                        <span className={classes.postuserName}>{User.userName}</span>
                        {props.post.username === "jainish buha" ? <CheckCircle className={classes.CheckCircle} /> : null}
                        <span className={classes.postDate}>{format(props.post.createdAt)}</span>
                    </div>
                    <div className={classes.postTopRight}>
                        <MoreVert />
                    </div>
                </div>
                <div className={classes.postCenter}>
                    <span className={classes.postText}>{props.post.desc}</span>
                    <hr className={classes.hr} />
                    {postimg ? <img className={classes.postImge} src={postimg} alt="" /> : <CircularProgress className={classes.postImge} color="blue" />}
                </div>
                <hr className={classes.hr} />
                <div className={classes.postbottom}>
                    <div className={classes.postBottomLeft}>

                        <ThumbUpAlt className={classes.Icon} onClick={likeHandler} />
                        <span className={classes.LikeCounter}>{like}</span>

                    </div>
                    <div className={classes.postBottomRight}>

                        <Comment className={classes.Icon} />
                        <span className={classes.CommentCounter}>{props.post.comment} comments</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Post;