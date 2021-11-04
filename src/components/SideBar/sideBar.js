import React, { useContext } from 'react';
import { RssFeed, Inbox, Person, Image, Duo, Message, Notifications, SettingsPower } from "@material-ui/icons"
import AuthContex from '../../store/auth-context';
import { useHistory } from 'react-router';

import classes from './sideBar.module.css'

const SideBar = () => {

    const authctx = useContext(AuthContex);
    let history = useHistory();

    const isLoggedIn = authctx.isLogedIn;


    const logOutHandler = () => {
        authctx.logout();
        history.replace('/auth')
    }

    const messageHandler = () => {
        history.replace('/messages')
    }
    return (
        <div className={classes.sideBar}>
            <div className={classes.sideWrapper}>
                <h4 className={classes.widget_title}>Shortcuts</h4>
                <ul className={classes.sideBarList}>
                    <li className={classes.sideBarListItem}>
                        <RssFeed className={classes.sideBarIcon} />
                        <span className={classes.sideBarListItemText}>Feed</span>
                    </li>
                    <li className={classes.sideBarListItem}>
                        <Inbox className={classes.sideBarIcon} />
                        <span className={classes.sideBarListItemText}>Inbox</span>
                    </li>
                    <li className={classes.sideBarListItem}>
                        <Image className={classes.sideBarIcon} />
                        <span className={classes.sideBarListItemText}>Images</span>
                    </li>
                    <li className={classes.sideBarListItem}>
                        <Person className={classes.sideBarIcon} />
                        <span className={classes.sideBarListItemText}>Friends</span>
                    </li>
                    <li className={classes.sideBarListItem}>
                        <Duo className={classes.sideBarIcon} />
                        <span className={classes.sideBarListItemText}>Videos</span>
                    </li>
                    <li className={classes.sideBarListItem} onClick={messageHandler}>
                        <Message className={classes.sideBarIcon} />
                        <span className={classes.sideBarListItemText}>Message</span>
                    </li>
                    <li className={classes.sideBarListItem}>
                        <Notifications className={classes.sideBarIcon} />
                        <span className={classes.sideBarListItemText}>Notifications</span>
                    </li>
                    <li className={classes.sideBarListItem} onClick={logOutHandler}>
                        <SettingsPower className={classes.sideBarIcon} />
                        <span className={classes.sideBarListItemText}>LogOut</span>
                    </li>
                </ul>
            </div>

            <div>
                <div className={classes.sideWrapper}>
                    <h4 className={classes.widget_title}>Recent Activity</h4>
                    <ul className={classes.sideBarList}>
                        <li className={classes.sideBarListItem2}>
                            <i className={classes.time}>10 hours Ago</i>
                            <br />
                            <span>Commented on Video posted</span>
                            <br />
                            <h6>by <a>black demon.</a></h6>
                        </li>
                        <li className={classes.sideBarListItem2}>

                            <i className={classes.time}>30 Days Ago</i>
                            <br />
                            <span>Posted your status. “Hello guys, how are you?”</span>

                        </li>
                        <li className={classes.sideBarListItem2}>

                            <span className={classes.time}>2 Years Ago</span>
                            <br />
                            <span>Share a video on her timeline.</span>
                            <br />
                            <h6>"<a href="#">you are so funny mr.been.</a>"</h6>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBar;