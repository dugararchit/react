// Import React
import React from 'react';
import Messages from "./Messages";


const MainChat = ({ messages, name }) => {

  
    return messages.map((message, i) => {
      return <Messages key={i} message={message} name={name}></Messages>
    })
  
}

export default MainChat;
