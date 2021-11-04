import React, { useContext, useEffect, useState } from 'react';
import AuthContex from '../../store/auth-context';

import classes from './conversation.module.css'
import logo from '../assets/resources/photo9.jpg'
import axios from 'axios';
function Conversation(props) {

    const authCtx = useContext(AuthContex)
    const token = authCtx.token
    const [person, setPerson] = useState({})
    const conversationMember = props.conversation.members[0] !== authCtx.user._id ? props.conversation.members[0] : props.conversation.members[1]
    useEffect(() => {


        const getPerson = async () => {
            try {
                let res = await axios.get('/user/' + conversationMember, { headers: { "Authorization": `Bearer ${token}` } })
                setPerson(res.data)

            } catch (e) {
                console.log(e);
            }
        }
        getPerson()
    }, [])
    return (
        <div className={classes.Conversation}>

            <img src={logo} alt="" className={classes.personpic} />
            <span className={classes.personName}>{person.userName}</span>
        </div>
    );
}


export default Conversation