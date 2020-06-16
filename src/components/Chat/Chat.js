
// Import React
import React, { Component } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import "./Chat.css";
import MainChat from "./MainChat";
import RecentChat from "./RecentChat";
import { FaRegPaperPlane, FaRegSmile } from 'react-icons/fa';
import { AiOutlineRollback } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { Picker } from 'emoji-mart';
import { emojify } from 'react-emoji';
import axios from 'axios';
let socket;
var indchat = false;
let indchatid = '';
var individualmessages = {};

var ENDPOINT = 'https://virtualchatsocket.herokuapp.com/';
// let allUsers = [];
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      room: '',
      messages: [],
      notificationsfromusers: [],
      message: '',
      usersocketidstate: '',
      serversocket: '',
      users: [],
      messagesbackup: [],
      smileyClass: 'd-none',
      uploadClass: 'd-none',
      messagenew: ''
    };
  }

  componentDidMount() {
    socket = io(ENDPOINT);
    const { name, room } = queryString.parse(window.location.search);
    this.setState({
      name: name,
      room: room
    });
    socket.emit("join", { name, room }, ({ error, user }) => {

      this.setState({
        serversocket: socket
      });
      if (error) {
        alert(error);
        socket.emit("disconnect", { name, room });
        socket.off();
      } else {
        this.logger(user);
      }
    })

    socket.on("message", (message) => {
      //this.logger(message);
      this.logger("Came");

      if (indchat === false) {
        this.setState({
          messages: [...this.state.messages, message]
        });
      } else {
        this.setState({
          messagesbackup: [...this.state.messagesbackup, message]
        });
      }
      document.getElementsByClassName("msg_history")[0].scrollTop = document.getElementsByClassName("msg_history")[0].scrollHeight
    })


    socket.on("messagefile", (message) => {
      //this.logger(message);
      this.logger("Came");
      this.logger(message);
      // if (indchat === false) {
      //  this.logger(message);
      // } else {

      this.setState({
        messages: [...this.state.messages, message]
      });
      //}

    })

    socket.on("receivemsg", async (message) => {
      this.logger("Receiving messages");
      // this.logger(message);
      // this.logger("Done");
      // this.logger(allUsers);
      // this.logger("came inside");
      this.logger(this.state.users);
      if (this.state.users.length > 0) {
        var name = await this.state.users.find(user => user.id === message.from);

        var setMessagesObj = { user: name.name, text: message.msg };
        // var userSocket = message.from;
        if (typeof individualmessages[message.from] === "undefined") {
          // setIndividualmessages[{[message.from]: []}];
          individualmessages[message.from] = [];
        }

        //setIndividualmessages([...individualmessages[message.from], setMessages]);
        individualmessages[message.from].push(setMessagesObj);
        // this.logger(individualmessages[message.from]);
        // this.logger(indchat);
        // this.logger(indchatid);


        if (indchat === true && indchatid === message.from) {
          this.setState({
            messages: [...this.state.messages, setMessagesObj]
          });
          this.logger(individualmessages);
        } else {
          this.logger(message.user);
          this.setState({
            notificationsfromusers: message.user
          });
        }
        this.logger("==================");
      }
    })


    socket.on("recentusers", (users) => {
      const newUsers = users.users.filter(user => user.id !== socket.id);
      //allUsers = newUsers;

      this.setState({
        users: [...newUsers]
      });

    })
  }

  componentWillUnmount() {
    socket.emit("disconnect");
    socket.off();
  }


  logger = (msg) => {
    //this.logger(msg);
  }

  sendMessage = (event) => {
    event.preventDefault();
    if (this.state.message === "") {
      alert("Please enter message");
    } else {

      if (indchat === false) {
        socket.emit("sendMessage", this.state.message, (data) => {
          this.logger("Message Emitted");
          this.setState({
            message: ""
          });
        })
      } else {
        socket.emit("sendmessagetoserver", { from: socket.id, to: this.state.usersocketidstate, msg: this.state.message }, () => {
          this.logger("Done");
          if (typeof individualmessages[socket.id] === "undefined") {
            individualmessages[socket.id] = [];
          }
          individualmessages[this.state.usersocketidstate].push({ user: this.state.name, text: this.state.message });
          this.setState({
            messages: [...this.state.messages, { user: this.state.name, text: this.state.message }],
            message: ""
          });
        });
      }
    }
  }

  individualClick = (usersocketid) => {
    alert("Chat swithced");
    indchat = true;
    indchatid = usersocketid;
    this.setState({
      messagesbackup: [...this.state.messages],
      usersocketidstate: usersocketid,
      messages: []
    });

    socket.emit("notificatioremoval", { to: socket.id, from: usersocketid }, () => {
      this.logger(this.state.notificationsfromusers);
      // this.state.notificationsfromusers[usersocketid] = [];
      this.setState({
        notificationsfromusers: { usersocketid: [] }
      });
      this.logger(this.state.notificationsfromusers);

      //   if (this.state.notificationsfromusers.notification) {
      //     this.state.notificationsfromusers.notification.splice(this.state.notificationsfromusers.notification.findIndex(e => e.from === this.state.usersocketid), 1);
      //   }

      //   this.setState({
      //     notificationsfromusers: [this.state.notificationsfromusers]
      //   });
    });

    if (typeof individualmessages[usersocketid] === "undefined") {
      individualmessages[usersocketid] = [];
    }
    this.logger(individualmessages);
    if (individualmessages[usersocketid].length > 0) {
      this.logger(individualmessages);
      this.setState({
        messages: individualmessages[usersocketid]
      });
    }
  }

  rollbacktomainchat = () => {
    this.setState({
      messages: this.state.messagesbackup
    });
    indchat = false;
    const currentClass = document.getElementsByClassName("chat_list");
    for (let i = 0; i < currentClass.length; i++) {
      currentClass[i].classList.remove("active");
    }
  }

  showsmiley = (event) => {
    event.preventDefault();
    var classSelected = (this.state.smileyClass === "" ? "d-none" : "");
    this.setState({
      smileyClass: classSelected
    });
  }

  selectSmiley = (emojis) => {
    this.setState({
      message: this.state.message + " " + emojis.colons,
      smileyClass: 'd-none'
    });
  }

  showUpload = (event) => {
    event.preventDefault();
    var classSelected = (this.state.uploadClass === "" ? "d-none" : "");
    this.setState({
      uploadClass: classSelected
    });
  }


  onChangefileupload = (event) => {
    this.logger(event.target.files[0]);

    const data = new FormData();
    data.append('file', event.target.files[0]);
    axios.post("https://virtualchatsocket.herokuapp.com/upload", data, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        this.logger(res);
        socket.emit("sendfile", { filename: res.data.file, 'type': 'file' }, () => {
          this.logger("Message Emitted");

        })
        this.setState({
          uploadClass: 'd-none'
        });
      })
  }

  onChangeMessage = (event) => {
    this.setState({ message: event.target.value });
    console.log(emojify(event.target.value));
    this.setState({
      messagenew: emojify(event.target.value)
    });
  }

  render() {
    // console.log(emojify(this.state.message));
    return (
      <div>
        <div className="container">
          <h3 className=" text-center">Welcome to Room {this.state.room}, {this.state.name}</h3>

          <div className="messaging">
            <div className="inbox_msg">
              {

                (indchat === true)
                  ? <span onClick={e => this.rollbacktomainchat()}><AiOutlineRollback style={{ fontSize: "xx-large" }}></AiOutlineRollback></span>
                  : null
              }
              <RecentChat notificationsfromusers={this.state.notificationsfromusers} users={this.state.users} socket={this.state.serversocket} individualClick={this.individualClick}></RecentChat>

              <div className="mesgs">
                <div className="msg_history">

                  <MainChat messages={this.state.messages} name={this.state.name}></MainChat>
                  <div className={this.state.smileyClass}>
                    <Picker onSelect={(emojis) => this.selectSmiley(emojis)} style={{ position: 'absolute' }} />
                  </div>
                  <div className={this.state.uploadClass}>
                    <div className="form-group files">
                      <label>Upload Your File </label>
                      <input type="file" className="form-control" onChange={this.onChangefileupload} />
                    </div>
                  </div>
                </div>

                <div className="type_msg">
                  <div className="input_msg_write">

                    <input type="text" className="write_msg" placeholder="Type a message" value={this.state.message}
                      onChange={event => this.onChangeMessage(event)}
                      onKeyPress={event => (event.key === "Enter") ? this.sendMessage(event) : null} />
                    
                    {

                      (indchat === false)
                        ? <button onClick={(event) => this.showUpload(event)} className="msg_send_btn" style={{ right: "70px" }} type="button">
                          <GrAttachment></GrAttachment></button>
                        : null
                    }
                    <button onClick={(event) => this.showsmiley(event)} className="msg_send_btn" style={{ right: "35px" }} type="button">
                      <FaRegSmile></FaRegSmile></button>
                    <button onClick={(event) => this.sendMessage(event)} className="msg_send_btn" type="button">
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
}


export default Chat;
