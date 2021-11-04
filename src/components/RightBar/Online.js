import React from 'react';
import classes from './RightBar.module.css'
import { FiberManualRecord } from "@material-ui/icons"


import a1 from "../assets/resources/friend-avatar5.jpg"

function Online(props) {
    let color = ""
    if (props.user.online === 1) {
        color = "green"
    } else {
        color = "red"
    }

    return (

        <div className={classes.onlineUser}>

            <div className={classes.onlineUser1}>
                <img src={props.user.profilePicture} alt="" className={classes.userImg} />
                <div className={classes.chatOnlineBadge}></div>
            </div>
            <span className={classes.OnlineText}>
                <b>{props.user.username}</b>
            </span>
        </div>


    );
}

export default Online;