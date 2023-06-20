import LeftBlock from '../components/Left Block for window Screen/LeftBlock';
import { AiOutlineArrowLeft } from "react-icons/ai";
import editIcon from "../assets/editIcon.svg"
import sendIcon from "../assets/sendIcon.svg"
import clipIcon from "../assets/clipIcon.svg"
import cameraIcom from "../assets/Icon.svg"
import cardIcon from "../assets/Icon-1.svg"
import vcallIcon from "../assets/vcall.svg"

import ContactProfile from '../components/Contact Profile Name/ContactProfile';
import "../styles/ChatScreen.css"
import Chat from '../components/Chat/Chat';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';



const ChatScreen = () => {
    const [mode, setMode] = useState(false);
    const [chats, setChats] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [data, setdata] = useState([]);
    const [scrollbottom, setScrollbottom] = useState(0);
    const [page, setPage] = useState(1);
    const chatBoxRef = useRef(null);


    //function for the change the format of date and time
    function formatDate(dateTimeString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateTime = new Date(dateTimeString);
        const formattedDateTime = dateTime.toLocaleDateString('en-US', options);
        return formattedDateTime;
    }

    useEffect(() => {
        fetchChats();
    }, [page]);

    useEffect(() => {
        scrollToBottom();
    }, [chats])

    //api calling
    const fetchChats = () => {
        axios.get(`https://qa.corider.in/assignment/chat?page=${page}`)
            .then(response => {
                const newChats = response.data.chats;
                setdata(response.data)
                setChats([...chats, ...newChats]);
                localStorage.setItem("alldata", JSON.stringify([...chats, ...newChats]))
                setMode(false)
            })
            .catch(error => {
                console.error(error);
                const collection = localStorage.getItem("alldata")
                setChats(JSON.parse(collection))
                setMode(true)
            });
    };

    function scrollToBottom() {
        if (chatBoxRef.current) {
            if (scrollbottom > 1) {
                chatBoxRef.current.scrollTop = (chatBoxRef.current.scrollHeight / 4);
            } else {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
        }
    };

    const handleScroll = () => {
        if (chatBoxRef.current.scrollTop === 0) {
            setPage(prev => prev + 1)
            setScrollbottom(scrollbottom + 1)
        }
    };



    return (
        <div className='container-fluid'>
            <div className='row h-100'>
                <div className='col-3 bg-dark d-lg-block d-none'>
                    <LeftBlock data={data} />
                </div>
                <div className='col-12 col-lg-9 px-3 chat-screen-bg'>
                    <div className='d-flex justify-content-between align-items-center my-3'>
                        <div className='d-flex align-items-center'>
                            <span className='me-2'><AiOutlineArrowLeft style={{ fontSize: "22px" }} /></span>
                            <h1>{data?.name}</h1>
                        </div>
                        <div>
                            <div className='mx-2'><img src={editIcon} alt="editIcon" /></div>
                        </div>
                    </div>
                    <div>
                        <ContactProfile item={data} />
                    </div>
                    {(mode)&&<div className="alert alert-warning m-0 p-2" role="alert">
                        <p className='m-0 p-0 text-center'>you are in offline mode</p>
                    </div>}
                    <div className='chat_box pb-2' ref={chatBoxRef} id='chatBox' onScroll={handleScroll}>
                        <InfiniteScroll
                            dataLength={chats?.length}
                            next={fetchChats}
                            hasMore={true}
                            scrollableTarget="chatBox"
                            inverse={true}
                        >
                            <>
                                <div className='message-date'>
                                    <div className='date translate-middle top-0 start-50'>
                                        <p>{formatDate(chats[scrollbottom]?.time)}</p>
                                    </div>
                                    <div className='date_line' />
                                </div>
                                <div className='pt-4'>
                                    <Chat item={chats} />
                                </div>
                            </>
                        </InfiniteScroll>
                    </div>
                    <div className='position-relative'>
                        <div className={`pop_over ${toggle ? "d-flex" : "d-none"} justify-content-around align-items-center`}>
                            <div className='arrow' />
                            <img src={cameraIcom} alt="camera" />
                            <img src={vcallIcon} alt="vcallicon" />
                            <img src={cardIcon} alt="camera" />
                        </div>
                        <input type="text" className="form-control my-2" placeholder='Reply to @rohit' />
                        <div className='input_icon'>
                            <span onClick={() => setToggle(!toggle)} className='cursor-pointer mx-2 data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover"'><img src={clipIcon} alt="clipIcon" /></span>
                            <span className='mx-2'><img src={sendIcon} alt="sendIcon" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;