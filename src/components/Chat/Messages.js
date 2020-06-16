// Import React
import React from 'react';
import { emojify } from 'react-emoji';
import 'emoji-mart/css/emoji-mart.css'


const Messages = ({ message, name }) => {
    var isCurrentUser = false;
    var { user, text, file } = message;
    if (user === name) {
        isCurrentUser = true;
    }
    
    if (!isCurrentUser) {
        return (<div className="outgoing_msg">
            <div className="sent_msg">
                <p>{emojify(text)}</p>
                
                <span>{user}</span>
                {
                    (file !== undefined) ? <div><br /><p dangerouslySetInnerHTML={{ __html: file }} ></p></div> : null
                }
            </div>
        </div>)
    } else {
        return (<div className="incoming_msg">
            <div className="incoming_msg_img">
                {/* <img src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil" /> */}
                <span>{user}</span>
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{emojify(text)}</p>
                    {
                        (file !== undefined) ? <div><br /><br /><p dangerouslySetInnerHTML={{ __html: file }} ></p></div> : null
                    }

                </div>
            </div>

        </div>)
    }
}

export default Messages;
