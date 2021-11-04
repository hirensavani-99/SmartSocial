import React, { useContext, useEffect, useRef, useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import Conversation from '../../components/Conversations/Conversation';
import Message from '../../components/Message/Message';
import Online from '../../components/RightBar/RightBar'
import ChatOnline from '../../components/Conversations/Online'
import AuthContex from '../../store/auth-context';
import classess from './Messanger.module.css'
import axios from 'axios';
import { io } from "socket.io-client";


function Messanger(props) {


    const [conversation, setConversation] = useState([])
    const [chat, setchat] = useState(null)
    const [message, setMessage] = useState({})
    const [addmessage, setAddMessage] = useState("")
    const [arrivalMessage, setArraivalMessage] = useState(null)
    const [onLineUser, SetOnlineUsers] = useState([])
    const authctx = useContext(AuthContex)
    const token = authctx.token
    const scrollRef = useRef()
    const socket = useRef()



    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArraivalMessage({
                sendId: data.userId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && chat?.members.includes(arrivalMessage.sendId) &&
            setMessage(prev => [...prev, arrivalMessage])
    }, [arrivalMessage])
    useEffect(() => {
        socket.current.emit("addUser", authctx.user._id)

        socket.current.on("getUser", users => {
            SetOnlineUsers(users)
        })
    }, [authctx.user])

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const res = await axios.get("/api/conversation", { headers: { "Authorization": `Bearer ${token}` } })
                setConversation(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchConversation()

    }, [])


    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await axios.get("/api/message/" + chat?._id, { headers: { "Authorization": `Bearer ${token}` } })
                setMessage(res.data)
                console.log('g');
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchMessage()
    }, [chat?._id])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    const messageHandler = async (e) => {
        e.preventDefault();

        const newmessage = {
            sendId: authctx.user._id,
            text: addmessage,
            conversationId: chat._id
        }
        const receiverId = chat.members.find(
            (member) => member !== authctx.user._id
        )
        console.log(receiverId);

        socket.current.emit("sendMessage", {
            userId: authctx.user._id,
            receiverId,
            text: addmessage
        })

        try {
            const res = await axios.post('/api/message/', newmessage,
                { headers: { "Authorization": `Bearer ${token}` } })
            setMessage([...message, res.data])
            setAddMessage("")
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <React.Fragment>
            <TopBar />
            <div className={classess.messanger}>
                <div className={classess.chatMenu}>
                    <div className={classess.chatMenuWrapper}>

                        <h4 className={classess.widget_title}>Friends</h4>
                        <input placeholder="Search for friends" className={classess.chatMenuInput} />
                        {conversation.map(con => (
                            <div onClick={() => setchat(con)}>
                                <Conversation conversation={con} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classess.chatBox}>
                    <div className={classess.chatBoxWrapper}>
                        {chat ?
                            <>
                                <div className={classess.chatBoxTop}>
                                    {message.map((mes) => (
                                        <div ref={scrollRef}>
                                            <Message message={mes} own={mes.sendId === authctx.user._id} />
                                        </div>
                                    ))}
                                </div>

                                <div className={classess.chatBoxBottom}>
                                    <textarea
                                        onChange={(e) => setAddMessage(e.target.value)}
                                        value={addmessage}
                                        placeholder="message..."
                                        className={classess.chatmessageInput}></textarea>
                                    <button className={classess.sendButton}
                                        onClick={messageHandler}>send</button>
                                </div>
                            </> : <span className={classess.NoConversation}>what are you waiting for ? Start chat!</span>}
                    </div>
                </div>
                <div className={classess.chatOnline}>
                    <div className={classess.chatOnlineWrapper}>
                        <ChatOnline
                            className={classess.chatOnline}
                            onLineUser={onLineUser}
                            currentIId={authctx.user._id}
                            setCurrentChate={setchat} />
                    </div>
                </div>

            </div>
        </React.Fragment >
    );
}


export default Messanger;