import React, { useRef, useState } from 'react';
import axios from "axios"
import classes from "./Login.module.css"

function Register(props) {


    const [err, seterr] = useState("")
    const [register, setRegister] = useState("Register")

    const userNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const PasswordInputRef2 = useRef();
    const homeTownInputRef = useRef();
    const cityInputRef = useRef();
    const relationshipInputRef = useRef();
    const descInputRef = useRef();

    const submitHandler = async (event) => {
        seterr("")
        setRegister("Loading")
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredUserName = userNameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredPassword2 = PasswordInputRef2.current.value;
        const enteredHomeTown = homeTownInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredrelationShip = relationshipInputRef.current.value;
        const enteredDesc = descInputRef.current.value;



        if (enteredEmail.trim() !== '' && enteredUserName.trim() !== '' && enteredPassword.trim() !== '') {
            if (enteredPassword === enteredPassword2) {
                await axios.post("/users", {
                    userName: enteredUserName,
                    email: enteredEmail,
                    password: enteredPassword,
                    desc: enteredDesc,
                    city: enteredCity,
                    from: enteredHomeTown,
                    relationship: enteredrelationShip
                }).then((res) => { console.log(res.data) }, (e) => { seterr("invalid Input somewhere") })

            }
            else {
                seterr("password should be same")
            }
        } else {
            seterr("neccassary data not entered")
        }

        setRegister("Register")

    }

    return (
        <React.Fragment>

            <form onSubmit={submitHandler} className={classes.loginBox1}>
                <div className={classes.div}>
                    <h2 className={classes.Log_title}>sign up</h2>
                    <p>
                        Don’t use SmartSocial Yet? <a href="#" title="">Join now</a>
                    </p>
                </div>

                <input placeholder="UserName" className={classes.loginInput} ref={userNameInputRef} />
                <input placeholder="email" type="email" className={classes.loginInput} ref={emailInputRef} />
                <input placeholder="password" type="password" className={classes.loginInput} ref={passwordInputRef} />
                <input placeholder="again Password" type="password" className={classes.loginInput} ref={PasswordInputRef2} />
                <input placeholder="homeTown" className={classes.loginInput} ref={homeTownInputRef} />
                <input placeholder="city" className={classes.loginInput} ref={cityInputRef} />
                <select className={classes.loginInput} ref={relationshipInputRef}>
                    <option value="1">Single</option>
                    <option value="2">married</option>
                    <option selected value="3">Complicated</option>
                </select>
                <input placeholder="About you .." className={classes.loginInput} ref={descInputRef} />

                {err !== "" ? <p className={classes.p}>{err}</p> : null}
                <button className={classes.loginButton}>{register}</button>

                <button className={classes.loginResigetr} onClick={props.onClick}>Already have an Account</button>
            </form>
        </React.Fragment>
    );
}


export default Register;