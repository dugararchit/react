import React from 'react';
import "./App.css";
import Messagelist from './Messagelist';
import Chathomepage from './chathomepage';
import { detectIntent } from './services';
import { connect } from 'react-redux';
import { increment, decrement, senderMessage, receiverMessage, resetMessages} from './actions';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            // sender: ["Hi I am Bot!!! What can I do for you today..."],
            // receiver: [""],
            suggestions: [],
            showBot: true,
            showBotText: "X",
        }
        this.onClickSend = this.onClickSend.bind(this);
        this.toggleShowBot = this.toggleShowBot.bind(this);
        
    }



    toggleChatBot() {
        let element = document.getElementsByClassName("Layout-expand");
        element[0].style.display = (element[0].style.display === "") ? "block" : "";
    }

    closeChatBot() {
        let element = document.getElementsByClassName("Layout-expand");
        element[0].style.display = "";
    }

    onClickSend(queryText) {
        var message = (queryText) ? queryText : document.getElementById("sendermessage").value.trim();
        if (message) {
            // this.setState({
            //     sender: [...this.state.sender, message]
            // })
            this.props.senderMessage(message);
            document.getElementById("sendermessage").value = "";
            this.setState({
                suggestions: []
            })
            detectIntent(message).then(data => {
                if (data.success && data.message) {
                    if (data.suggestions.length > 0) {
                        this.setState({
                            suggestions: data.suggestions
                        })
                    }
                    // this.setState({
                    //     receiver: [...this.state.receiver, data.message]
                    // })
                    this.props.receiverMessage(data.message);
                } else {
                    let message = "There is an error while processing your request, please try after sometime.";

                    // this.setState({
                    //     receiver: [...this.state.receiver, message]
                    // })
                    this.props.receiverMessage(message);
                }
            }).catch(err => {
                console.log(err);
                var message = "There is an error while processing your request, please try after sometime.";
                // this.setState({
                //     receiver: [...this.state.receiver, message]
                // })
                // this.setState({
                //     receiver: [...this.state.receiver, message]
                // })
                this.props.receiverMessage(message);
            })
        } else {
            alert("Please Enter message");
        }
    }

    toggleShowBot() {
        var botMessage = "X";
        if (this.state.showBot === true) {
            botMessage = "Lets chat";
        }
        this.setState({
            showBot: !this.state.showBot,
            showBotText: botMessage
        })
    }

    render() {

        //const { transcript, resetTranscript, startListening, stopListening } = this.props;
        var showBotClass = this.state.showBot ? 'chat_window animated bounceOutLeft' : 'chat_window d-none';

        return (


            <div className="container">
                <Chathomepage></Chathomepage>
                <button className="btn btn-primary bottombutton" onClick={e => this.toggleShowBot()}>{this.state.showBotText}</button>
                {/*                 <button onClick={() => this.props.increment()}> + </button>
                <button onClick={() => this.props.decrement()}> - </button>
                <h1>Counter: {this.props.counter}</h1> */}

                <div className={showBotClass}>

                    <div className="top_menu">
                        <div className="title">Chat</div>
                    </div>
                    <Messagelist onclicksuggestion={(querytext) => {
                        this.onClickSend(querytext);
                    }} sender={this.props.sender}
                        receiver={this.props.receiver}
                        suggestions={this.state.suggestions}
                    ></Messagelist>

                    <div className="bottom_wrapper clearfix">
                        <div className="message_input_wrapper">
                            <input className="message_input" autoComplete="off" id="sendermessage" onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.onClickSend();
                                }
                            }} placeholder="Type your message here..." /></div>

                        <div className="send_message">
                            <div className="icon"></div>
                            <div className="text" onClick={() => {
                                this.props.resetMessages();
                                this.setState({
                                    suggestions: []
                                })
                            }}>Reset</div>
                        </div>
                        <div className="send_message">
                            <div className="icon"></div>
                            <div className="text" onClick={() => {
                                this.onClickSend()
                            }}>Send</div>
                        </div>
                    </div>


                </div>
                <div className="message_template">
                    <li className="message">
                        <div className="avatar"></div>
                        <div className="text_wrapper">
                            <div className="text"></div>
                        </div>
                    </li>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        sender: state.sender,
        receiver: state.receiver
    }
};

const mapDispatchToProps = () => {
    return {
        increment,
        decrement,
        senderMessage,
        receiverMessage,
        resetMessages
    };
}

export default connect(mapStateToProps, mapDispatchToProps())(App);