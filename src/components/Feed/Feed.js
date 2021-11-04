import React, { useEffect, useState, useContext } from 'react';
import Share from '../share/share'
import Post from "../Posts/Post"
import classes from './Feed.module.css'
import axios from "axios"
import AuthContex from "../../store/auth-context"



//let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRiNzM3MDI2MzNlNDM4YzA5OGYwNjYiLCJpYXQiOjE2MjUyMjQzMDB9.U48MaQEEz8uQfn3a3ZG8rllqertRa20xTJAaqZ97zgI"

function Feed(props) {

    const [posts, setPost] = useState([])

    const authCtx = useContext(AuthContex)

    let token = authCtx.token;

    console.log(authCtx);

    console.log(props.username);

    useEffect(() => {
        const fetchPost = async () => {
            const res = props.username ? await axios.get(`/api/posts/profile/${props.username.trim()}`,
                { headers: { "Authorization": `Bearer ${token}` } })
                : await axios.get("/api/posts/timeline/all",
                    { headers: { "Authorization": `Bearer ${token}` } })

            setPost(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))

            setPost(res.data)
        }
        fetchPost();
    }, [props.username, token])
    return (
        <div className={classes.feed}>
            <div className={classes.feedWrapper}>
                <Share />
                {posts.map(postData => <Post key={postData._id} post={postData} profile />)}

            </div>
        </div>
    );
}

export default Feed