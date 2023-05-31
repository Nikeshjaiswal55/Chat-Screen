import React from 'react';
import verifyIcon from "../../assets/verifiedIcon.svg"

const Chat = ({ item }) => {
    return (
        <>
            { item?.slice().reverse().map((item,index) => <div key={index} className={`d-flex pt-4 ${(item?.sender?.self) ? 'flex-row-reverse' : ""}`}>
                <div className={`position-relative me-2 ${(item?.sender?.self) ? 'd-none' : ""}`}>
                    <img className='profile_photo' src={item?.sender?.image}  alt="profile_photo" />
                    <span className={`verifyIcom ${(item?.sender?.is_kyc_verified) ? 'd-none' : ""}`}><img src={verifyIcon} className='verifyIcon1' alt="verify" /></span>
                </div>
                <div className={`${(item?.sender?.self) ? 'message2' : "message"}`}>
                    <p className={`message-font ${(item?.sender?.self) ? 'text-light' : ""}`}>{item?.message} </p>
                </div>
            </div>)}
        </>
        
    );
};

export default Chat;