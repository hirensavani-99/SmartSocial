import React, { useContext, useState, useRef, useEffect } from 'react';
import classes from './share.module.css'
import { PermMedia, Label, Room, EmojiEmotions, StayCurrentLandscape } from "@material-ui/icons"
import AuthContext from "../../store/auth-context"


import pic1 from "../../assets/assets/person/noAvatar.png";
import axios from 'axios';


function Share(props) {

    const authCtx = useContext(AuthContext)
    const [pic, setpic] = useState(pic1)
    const desc = useRef()
    const [file, setFile] = useState(null)

    const token = authCtx.token;

    if (authCtx.user.profilePicture) {

        let profileBuff = new Buffer(authCtx.user.profilePicture);
        let profileImg = profileBuff.toString("base64")
        setpic(`data:image/jpeg;base64,${profileImg}`)
    }

    const changeHandler = (e) => {
        setFile(e.target.files[0])
    }

    const submitHandler = async (e) => {
        e.preventDefault();


        if (file) {
            // const newPost = {
            //     desc: desc.current.value
            // }

            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("avatar", file);
            data.append("name", fileName)
            data.append("desc", desc.current.value)
            //newPost.avatar = data;
            //console.log(newPost);
            try {

                await axios.post('/api/posts/', data, { headers: { "Authorization": `Bearer ${token}`, } })
                window.location.reload()
            } catch (e) {
                console.log(e)
            }
        }
    }



    return (
        <div className={classes.share}>
            <div className={classes.sharewrapper}>
                <div className={classes.shareTop}>
                    <img className={classes.shareprofilepicture} src={pic} alt="" />
                    <input placeholder={"what's in your head " + authCtx.user.userName + "?"} ref={desc} className={classes.shareinput} />
                </div>
                <hr className={classes.sharehr} />
                <form className={classes.sharebottom} onSubmit={submitHandler}>
                    <div className={classes.shareoptions}>
                        <label htmlFor="file" className={classes.shareoption}>
                            <PermMedia htmlColor="tomato" className={classes.shareIcon} />
                            <span className={classes.shareoptiontext}>Photo Or video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpg,.jpeg" onChange={changeHandler} />
                        </label>
                        <div className={classes.shareoption}>
                            <Label htmlColor="blue" className={classes.shareIcon} />
                            <span className={classes.shareoptiontext}>Tag</span>
                        </div>
                        <div className={classes.shareoption}>
                            <Room htmlColor="green" className={classes.shareIcon} />
                            <span className={classes.shareoptiontext}>Location</span>
                        </div>
                        <div className={classes.shareoption}>
                            <EmojiEmotions htmlColor="goldenrod" className={classes.shareIcon} />
                            <span className={classes.shareoptiontext}>Feelings</span>
                        </div>
                        <button className={classes.shareButton} type="submit">Post</button>
                    </div>
                </form>
            </div>

        </div >
    );
}

export default Share;