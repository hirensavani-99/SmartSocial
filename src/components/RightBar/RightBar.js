import React, { useEffect, useState, useContext } from 'react';
import classes from './RightBar.module.css'
import {
    Cake, LocationCity, Home, Person
} from "@material-ui/icons"
//import { Users } from "../../DummyData"
import Online from "./Online"
import axios from "axios";
import authCtx from "../../store/auth-context.js"



import a1 from "../../assets/assets/person/noAvatar.png"
import a2 from "../assets/resources/ad-widget.jpg"



const Users = {

    id: 1,
    profilePicture: a1,
    username: "Hiren savani",
    online: 0
}

const HomeRightbar = () => (

    < div className={classes.rightBar} >

        <div className={classes.rightBarWrapper}>
            <h4 className={classes.widget_title}>Birthdays</h4>
            <div className={classes.birthdayContainer}>
                <Cake htmlColor="red" className={classes.birthdayImge} />
                <span className={classes.birthdayText}>
                    <b>Kalpit Patel</b> and <b>3 others</b> have a birthday Today. <a>more...</a>
                </span>
            </div>
        </div>
        <div className={classes.rightBarWrapper}>
            <h4 className={classes.widget_title}>Online Friends</h4>
            <Online key={Users.id} user={Users} />
        </div>
        <div className={classes.rightBarWrapper}>
            <img src={a2} alt="" className={classes.ad} />
        </div>
    </div >

)



const ProfileRightBar = (props) => {

    const authctx = useContext(authCtx)

    const token = authctx.token;

    const [follower, setfollower] = useState([])

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get("/friends", { headers: { "Authorization": `Bearer ${token}` } })
                setfollower(res.data)
                //console.log(res.data);
            } catch (e) {
                console.log(e)
            }
        }

        fetchFriends()
    }, [token])

    const imagetarnsfer = (arr) => {
        if (arr) {
            let profileBuff = new Buffer(arr);
            let profileImg = profileBuff.toString("base64")
            return `data:image/jpeg;base64,${profileImg}`

        }
        else {
            return a1
        }
    }
   
    return (

        <React.Fragment>

            <div className={classes.rightBar}>

                <div className={classes.rightBarWrapper}>


                    <h4 className={classes.widget_title}>User Information</h4>
                    <div className={classes.birthdayContainer}>
                        <LocationCity htmlColor="black" className={classes.PIcon} />
                        <span className={classes.birthdayText}>
                            <b>City</b> {props.user.city}
                        </span>
                    </div>

                    <div className={classes.birthdayContainer}>
                        <Home htmlColor="black" className={classes.PIcon} />
                        <span className={classes.birthdayText}>
                            <b>HomeTown</b> {props.user.from}
                        </span>
                    </div>

                    <div className={classes.birthdayContainer}>
                        <Person className={classes.PIcon} />
                        <span className={classes.birthdayText}>
                            <b>Relation-ship Status</b> {props.user.relationship === 1 ? "single" : props.user.relationship === 2 ? "commited" : "complicated"}
                        </span>
                    </div>


                </div>

                <div className={classes.rightBarWrapper1}>
                    <h4 className={classes.widget_title}>Friends</h4>
                    {follower.map(u => (
                        <div className={classes.onlineUser} >
                            <img src={imagetarnsfer(u.profilePicture)} alt="" className={classes.userImg} />
                            <span className={classes.OnlineText}>
                                <b>{u.userName}</b>
                            </span>
                        </div>
                    ))}
                </div>

            </div >
        </React.Fragment>
    )
}
function RightBar(props) {

    return (
        <React.Fragment>
            {props.user ? <ProfileRightBar user={props.user} /> : <HomeRightbar />}

        </React.Fragment>

    );
}

export default RightBar;