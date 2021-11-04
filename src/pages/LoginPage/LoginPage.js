import React, { useState } from 'react';
import classes from "./Login.module.css"
import logo from "../../assets/1x.png"
import Login from '../../components/Login/Login'
import Register from '../../components/Login/Register'

const LoginPage = () => {

    const [login, setLogin] = useState(false)

    const loginchange = () => {
        setLogin(!login)

        console.log(login);
    }

    return (
        <div className={classes.login}>
            <div className={classes.loginWrapper}>
                <div className={classes.loginleft}>

                    <h1>SmartSocial</h1>
                    <p>
                        SmartSocial is free to use, protecting your personal data in the net free of charge.
                    </p>
                    <div class={classes.logo}>
                        <span><img src={logo} alt="" /></span>
                    </div>

                </div>
                <div className={classes.loginRight}>
                    {login ? <Login onClick={loginchange} /> : <Register onClick={loginchange} />}

                </div>
            </div>
        </div>
    );
};

export default LoginPage;