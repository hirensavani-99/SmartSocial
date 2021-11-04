import React, { useContext, useEffect, useState, useRef } from 'react';
import classes from "./TopBar.module.css"
import logo from "../assets/1x.png"
import { Link } from "react-router-dom"
import AuthContex from '../../store/auth-context';
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import imgg from '../../assets/assets/person/noAvatar.png';
import axios from 'axios'
import { useHistory } from 'react-router';

function TopBar(props) {
    let history = useHistory();
    const authctx = useContext(AuthContex)

    const [profile, setProfile] = useState(imgg)
    const searchRef = useRef();



    useEffect(() => {
        if (authctx.user != null) {

            if (authctx.user.profilePicture) {

                let buff = new Buffer(authctx.user.user.profilePicture);
                const img = buff.toString('base64')

                setProfile(`data:image/jpeg;base64,${img}`)
            }
        }
    })
    const messageHandler = () => {
        history.replace('/messages')
        console.log('x');
    }

    const seachHandler = async (event) => {
        event.preventDefault()
        const SearchRef = searchRef.current.value;
        //console.log(SearchRef);

        if (SearchRef.trim() !== "") {
            history.replace('/profile/' + SearchRef)
        }
    }


    return (
        <div className={classes.topbar}>
            <div className={classes.logo}>
                <Link to="/feed"    >
                    <span><img src={logo} alt="logo" width="40%" height="40%"></img></span>
                </Link>
            </div>
            <div className={classes.topBarCenter}>
                <div className={classes.searchBox}>
                    <Search type="submit" onClick={seachHandler} className={classes.searchIcon} />
                    <input placeholder="Search" className={classes.searchInput} ref={searchRef} />
                </div>
            </div>
            <div className={classes.topBarRight}>
                <div className={classes.topBarLinks}>
                    <Link className={classes.topBarLink} to={authctx.user !== null ? `/profile/${authctx.user.userName}` : '/feed'}>HomePage</Link>
                     <Link className={classes.topBarLink} to="/feed">TimeLine</Link>
                </div>
                <div className={classes.topBarIcon}>
                    <div className={classes.topBarIconItem}>
                        <Person />
                        <span className={classes.topBarIconBadge}>1</span>
                    </div>
                    <div className={classes.topBarIconItem} onClick={messageHandler}>
                        <Chat />
                        <span className={classes.topBarIconBadge}>1</span>
                    </div>
                    <div className={classes.topBarIconItem}>
                        <Notifications />
                        <span className={classes.topBarIconBadge}>1</span>
                    </div>

                </div>
                <Link to={authctx.user !== null ? `/profile/${authctx.user.userName}` : '/feed'}>
                    <img src={profile} alt="img" className={classes.topBarImg} />
                </Link>
            </div>
        </div >
    );
}

export default TopBar;