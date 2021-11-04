import React from 'react'
import classes from './home.module.css'
import TopBar from '../../components/TopBar/TopBar'
import SideBar from '../../components/SideBar/sideBar'
import Feed from '../../components/Feed/Feed'
import RightBar from '../../components/RightBar/RightBar'

const Home = () => {
    return (
        <React.Fragment>
            <TopBar />
            <div className={classes.HomeContainer}>
                <SideBar className={classes.SideBar} />
                <Feed />
                <RightBar />
            </div>

        </React.Fragment>
    );

}

export default Home;