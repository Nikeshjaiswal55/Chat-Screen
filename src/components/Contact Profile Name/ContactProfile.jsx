import React from 'react';
import memberIcon from "../../assets/memberIcon.svg"
import callIcon from "../../assets/callicon.svg"
import reportIcon from "../../assets/reportIcon.svg"
import threeDotIcon from "../../assets/threeDotIcon.svg"


const ContactProfile = ({ active_backgound, text_light, item }) => {
    const {chats}=item
    return (
        <div className={`py-1 mt-3 mb-1 d-flex align-items-center px-1 ${active_backgound}`}>
            <span className='collage'>
                <img className='contact_profile_photo1' src={chats?chats[0]?.sender?.image:""} alt="profile_photo" />
                <img className='contact_profile_photo2' src={chats?chats[1]?.sender?.image:""} alt="profile_photo" />
                <img className='contact_profile_photo3' src={chats?chats[2]?.sender?.image:""} alt="profile_photo" />
                <img className='contact_profile_photo4' src={chats?chats[3]?.sender?.image:""} alt="profile_photo" />
            </span>
            <div className='px-2'>
                <h2 className={`${text_light}`}>From : <span className={`text_bold ${text_light}`}>{item?.from}</span></h2>
                <h2 className={`${text_light}`}>To : <span className={`text_bold ${text_light}`}>{item?.to}</span>  </h2>
            </div>
            <div className='mx-2 ms-auto cursor-pointer position-relative dropdown'>
                <span className={`${text_light} ps-3`} style={{ padding: "1rem 0" }}><img src={threeDotIcon} alt="threeDotIcon" /></span>
                <div className={`menu_option position-absolute dropdown-menu`}>
                    <p className='menu_bottom_line d-flex align-items-center font-size14'><span className='px-2'><img src={memberIcon} alt="memberIcon" /></span>Member</p>
                    <p className='menu_bottom_line d-flex align-items-center font-size14'><span className='px-2'><img src={callIcon} alt="callIcon" /></span>Share Number</p>
                    <p className='menu_bottom_line d-flex align-items-center font-size14'><span className='px-2'><img src={reportIcon} alt="reportIcon" /></span>Report</p>
                </div>
            </div>
        </div>
    );
};

export default ContactProfile;