import React, { useEffect, useState, useContext } from 'react';

import {
    FiberManualRecord
} from "@material-ui/icons"


import classes from './Onine.module.css'
import logo from '../assets/resources/photo9.jpg'


function Online(props) {
    return (

        <div className={classes.chatOnline}>
            <h4 className={classes.widget_title}>Online Friends</h4>

            <div className={classes.chatOnlineFriend}>
                <div className={classes.userImgcontainer}>
                    <img className={classes.userImg} src={logo} alt="" />
                    <div className={classes.chatOnlineBadge}></div>
                </div>
                <span className={classes.userName}>Hiren jjjjSavani</span>
            </div>
            <div className={classes.chatOnlineFriend}>
                <div className={classes.userImgcontainer}>
                    <img className={classes.userImg} src={logo} alt="" />
                    <div className={classes.chatOnlineBadge}></div>
                </div>
                <span className={classes.userName}>Hiren Savani</span>
            </div>
            <div className={classes.chatOnlineFriend}>
                <div className={classes.userImgcontainer}>
                    <img className={classes.userImg} src={logo} alt="" />
                    <div className={classes.chatOnlineBadge}></div>
                </div>
                <span className={classes.userName}>Hiren Savani</span>
            </div>
            <div className={classes.chatOnlineFriend}>
                <div className={classes.userImgcontainer}>
                    <img className={classes.userImg} src={logo} alt="" />
                    <div className={classes.chatOnlineBadge}></div>
                </div>
                <span className={classes.userName}>Hiren Savani</span>
            </div>


        </div>

    );
}

export default Online;