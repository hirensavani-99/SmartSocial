import axios from 'axios';
import React, { useState, useRef, useContext } from 'react';
import classes from './Login.module.css'
import AuthContex from '../../store/auth-context';
import { Link, useHistory } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"


function Login(props) {

    let history = useHistory();
    const emailInputRef = useRef();
    const PasswordInputRef = useRef();

    const [login, setlogin] = useState("Login");
    const [err, seterr] = useState("")

    const authctx = useContext(AuthContex);

    const submitHandler = async (event) => {

        seterr("")
        setlogin(<CircularProgress color="white" />)
        event.preventDefault()


        const enterEmail = emailInputRef.current.value;
        const enterPassword = PasswordInputRef.current.value

        if (enterEmail.trim() !== '' && enterPassword.trim() !== '') {
            await axios.post("/users/login", {
                email: enterEmail,
                password: enterPassword,
            }).then((res) => {

                authctx.login(res.data.token)

                const { _id, followers, following, isAdmin, userName, email, token } = res.data.user


                authctx.fetchuser({ _id, followers, following, isAdmin, userName, email, token })
                console.log(authctx.user);

                history.replace('/feed')


            }, (e) => { seterr("Invalid field") }
            )
        }
        setlogin("Login")
    }


    return (
        <form onSubmit={submitHandler} className={classes.loginBox}>
            <h2 className={classes.Log_title}>Login</h2>
            <p>
                Don’t use SmartSocial Yet? <a href="#" title="">Join now</a>
            </p>

            <input placeholder="Email"
                type="email"
                className={classes.loginInput}
                required
                minLength="7"
                ref={emailInputRef}
            />
            <input placeholder="Password" require type="password" className={classes.loginInput} ref={PasswordInputRef} />
            <button className={classes.loginButton} disabled={login != "Login"}>{login}</button>

            {err !== "" ? <p className={classes.p}>{err}</p> : null}
            <span className={classes.loginforgot}>forgot password</span>
            <button className={classes.loginResigetr} onClick={props.onClick}>{login != "Login" ? login : "Register"}</button>

        </form>
    );
}

export default Login;