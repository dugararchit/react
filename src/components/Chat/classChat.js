// Import React
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import "./Chat.css";
import MainChat from "./MainChat";
import RecentChat from "./RecentChat";
import { FaRegPaperPlane } from 'react-icons/fa';

let socket;
var indchat = false;
let indchatid = '';
var individualmessages = {};

const Chat = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [messagesbackup, setMessagesbackup] = useState([]);
  // const [individualmessages, setIndividualmessages] = useState({});
  const [notificationsfromusers, setNotificationsfromusers] = useState({});
  const [message, setMessage] = useState('');
  const [usersocketidstate, setUsersocketidstate] = useState('');

  const [serversocket, setServersocket] = useState('');
  const [users, setUsers] = useState([]);
  var ENDPOINT = 'localhost:5000';
  let allUsers = [];

  useEffect(() => {
    socket = io(ENDPOINT);
    const { name, room } = queryString.parse(window.location.search);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, function ({ error, user }) {

      setServersocket(socket);
      if (error) {
        alert(error);
        socket.emit("disconnect", { name, room });
        socket.off();
      } else {
        logger(user);
      }
    })
    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, [ENDPOINT], window.location.search);

  useEffect(() => {
    socket.on("message", (message) => {
      //logger(message);
      logger("Came");

      // logger(messages);
      if (indchat === false)
        setMessages(messages => [...messages, message]);
      //setName(name => name + " name");
      document.getElementsByClassName("msg_history")[0].scrollTop = document.getElementsByClassName("msg_history")[0].scrollHeight
    })
  }, []);

  useEffect(() => {

    //if (typeof socket._callbacks.$receivemsg === "undefined") {
    socket.on("receivemsg", async (message) => {
      console.log("Receiving messages");
      // logger(message);
      // logger("Done");
      // logger(allUsers);
      // logger("came inside");
      console.log(users);
      if (users.length > 0) {
        var name = await users.find(user => user.id === message.from);

        var setMessagesObj = { user: name.name, text: message.msg };
        // var userSocket = message.from;
        if (typeof individualmessages[message.from] === "undefined") {
          // setIndividualmessages[{[message.from]: []}];
          individualmessages[message.from] = [];
        }

        //setIndividualmessages([...individualmessages[message.from], setMessages]);
        individualmessages[message.from].push(setMessagesObj);
        // logger(individualmessages[message.from]);
        // logger(indchat);
        // logger(indchatid);


        if (indchat === true && indchatid === message.from) {
          setMessages(messages => [...messages, setMessagesObj]);

          logger(individualmessages);
        } else {
          console.log(message.user);
          setNotificationsfromusers(notificationsfromusers => message.user);
        }
        logger("==================");
      }

    });
    return () => {
      socket.off("receivemsg");
    }
    //}
  }, [users])


  useEffect(() => {
    socket.on("recentusers", (users) => {
      const newUsers = users.users.filter(user => user.id !== socket.id);
      allUsers = newUsers;
      setUsers([...newUsers]);
      console.log(users);
    })
  }, [])

  // useEffect(() => {
  //   socket.on("useradded", (user) => {
  //     console.log(user);
  //     console.log(users);
  //     setUsers(users => [...users, user.user]);
  //   })
  //   return () => {
  //     socket.off("useradded");
  //   }
  // }, [])

  var logger = (msg) => {
    //console.log(msg);
  }

  var sendMessage = (event) => {
    event.preventDefault();
    if (message === "") {
      alert("Please enter message");
    } else {

      if (indchat === false) {
        socket.emit("sendMessage", message, function (data) {
          logger("Message Emitted");
          setMessage("");
        })
      } else {
        socket.emit("sendmessagetoserver", { from: socket.id, to: usersocketidstate, msg: message }, function () {
          logger("Done");
          setMessage("");
          setMessages([...messages, { user: name, text: message }]);
          if (typeof individualmessages[socket.id] === "undefined") {
            individualmessages[socket.id] = [];
          }
          individualmessages[usersocketidstate].push({ user: name, text: message });
        });
      }
    }
  }

  var individualClick = (usersocketid) => {
    alert("Chat swithced");
    // setIndchat(indchat => true);
    // setIndchatid(indchatid => usersocketid);
    indchat = true;
    indchatid = usersocketid;
    // alert(indchatid);
    // alert(indchat);
    setMessagesbackup([messages]);
    setUsersocketidstate(usersocketid);
    setMessages([]);


    socket.emit("notificatioremoval", { to: socket.id, from: usersocketid }, function () {

      if (notificationsfromusers.notification) {
        notificationsfromusers.notification.splice(notificationsfromusers.notification.findIndex(e => e.from == usersocketid), 1);
      }
      setNotificationsfromusers(notificationsfromusers);
    });

    if (typeof individualmessages[usersocketid] === "undefined") {
      individualmessages[usersocketid] = [];
    }
    if (individualmessages[usersocketid].length > 0) {
      logger(individualmessages);
      setMessages(individualmessages[usersocketid]);
    }
  }

  return (
    <div>
      <div className="container">
        <h3 className=" text-center">Welcome to Room {room} {name} {indchat} {allUsers[indchatid]} {indchatid}</h3>
        <div className="messaging">
          <div className="inbox_msg">
            <RecentChat notificationsfromusers={notificationsfromusers} users={users} socket={serversocket} individualClick={individualClick}></RecentChat>

            <div className="mesgs">
              <div className="msg_history">

                <MainChat messages={messages} name={name}></MainChat>

              </div>

              <div className="type_msg">
                <div className="input_msg_write">
                  <input type="text" className="write_msg" placeholder="Type a message" value={message}
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={event => (event.key === "Enter") ? sendMessage(event) : null} />
                  <button onClick={(event) => sendMessage(event)} className="msg_send_btn" type="button">
                    <FaRegPaperPlane></FaRegPaperPlane></button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}


export default Chat;
