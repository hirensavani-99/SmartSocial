import React from 'react';
import { format } from "timeago.js"

import classes from './Message.module.css'
import logo from '../assets/resources/photo9.jpg'
function Message(props) {
 

    return (
        <div className={props.own ? classes.myMessage : classes.message}>
            <div className={classes.messageTop}>
                <img className={classes.personpic} src={logo} alt="" />
                <p className={classes.messageText}>{props.message.text}</p>
            </div>
            <div className={classes.messageBottom}>{format(props.message.createdAt)}</div>
        </div>
    );
}


export default Message