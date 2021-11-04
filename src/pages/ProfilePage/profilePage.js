import React, { useState, useEffect, useContext } from 'react';
import Profile from "../../components/Profile/profile"
import classes from "./profilePage.module.css"
import TopBar from '../../components/TopBar/TopBar'
import SideBar from '../../components/SideBar/sideBar'
import Feed from '../../components/Feed/Feed'
import RightBar from '../../components/RightBar/RightBar'
import axios from "axios"
import { useParams } from "react-router"
import AuthContext from '../../store/auth-context'
import { Add, Remove, Chat } from '@material-ui/icons';
import { useHistory } from 'react-router';

import nocover from "../../assets/assets/person/noCover.png"
import noprofile from "../../assets/assets/person/noAvatar.png"

import { Button } from '@material-ui/core';


const ProfilePage = (props) => {
    const authCtx = useContext(AuthContext)
    console.log(authCtx.user.userName);
    const token = authCtx.token
    let history = useHistory();

    const [user, setUser] = useState({})
    const [profile, setprofile] = useState(noprofile)
    const [background, setbackground] = useState(nocover)
    const username = useParams().username
    const [follow, setFollow] = useState(false)
    const [followText, setFollowText] = useState("Following..")


    useEffect(() => {
        const fetchUser = async () => {
            try {

                const res = await axios.get(`/user?username=${username.trim()}`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                setUser(res.data)
                console.log(res.data);
                setFollow(res.data.followers.includes(authCtx.user._id))

                //transfer profile buffer to img buffer 
                if (res.data.profilePicture) {

                    let profileBuff = await new Buffer(res.data.profilePicture);
                    let profileImg = await profileBuff.toString("base64")
                    setprofile(`data:image/jpeg;base64,${profileImg}`)
                }
                else {
                    setprofile(noprofile)
                }

                // //transfer buffer to img
                if (res.data.coverPicture) {
                    let buff = await new Buffer(res.data.coverPicture);
                    const img = await buff.toString('base64')
                    setbackground(`data:image/jpeg;base64,${img}`)
                } else {
                    setbackground(nocover)
                }



            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();



    }, [username])

    useEffect(() => {
        if (user !== {}) {
            console.log(user);



        }
    }, [user, user._id])




    const followHandler = async () => {


        try {

            if (follow) {


                const res = await axios.put("/user/unfollow", { userId: user._id }, { headers: { "Authorization": `Bearer ${token}` } })
            }
            else {

                const res = await axios.put("/user/follow", { userId: user._id }, { headers: { "Authorization": `Bearer ${token}` } })
            }
            setFollow(!follow)

        } catch (e) {
            console.log(e);
        }
    }


    const startchatHandler = async () => {
        try {
            const res = await axios.post("/api/conversation", { otherPerson: user._id }, { headers: { "Authorization": `Bearer ${token}` } })
            console.log(res.data);
            // if (res.data !== undefined) {
            //     history.replace('/messages')
            // }

        } catch (e) {
            console.log(e);
        }
    }

    console.log(user);
    return (
        <div>
            <TopBar />
            <div className={classes.profile}>
                <SideBar className={classes.SideBar} />
                <div className={classes.profileRight}>
                    <div className={classes.profileRightTop}>
                        <div className={classes.profilecover}>
                            <img className={classes.coverpic} src={background} alt="" />
                            <img className={classes.profilepic} src={profile} alt="" />
                        </div>
                        <div className={classes.profileInfo}>
                            <h4 className={classes.profilename}>{user.userName}</h4>
                            <span className={classes.profiledesc}>{user.desc}</span>
                        </div>


                    </div>
                    {user.userName !== authCtx.user.userName && follow && (<button onClick={startchatHandler} className={classes.MessageButton}> <Chat className={classes.add} />Messages</button>)}
                    {user.userName !== authCtx.user.userName && (
                        <button className={classes.followButton} onClick={followHandler}>
                            {!follow ? "Follow" : "UnFollow"}
                            {!follow ? <Add className={classes.add} /> : <Remove className={classes.add} />}
                        </button>
                    )}


                    <div className={classes.profileRightBottom}>

                        <Feed username={username} />
                        <RightBar user={user} />
                    </div>



                </div>

            </div>
        </div >
    );
}

export default ProfilePage;