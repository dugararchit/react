import React from 'react';
// import SpeechRecognition from 'react-speech-recognition';
import "./App.css";
import Messagelist from './Messagelist';
import { detectIntent } from './services';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';
// import { BsFillMicFill, BsThreeDots } from "react-icons/bs";
// import ReactDOMServer from 'react-dom/server';

import Speech from 'speak-tts';

const speech = new Speech();
if (speech.hasBrowserSupport()) { // returns a boolean
    console.log("speech synthesis supported")
}

speech.init({
    'volume': 1,
    'lang': 'en-GB',
    'rate': 1,
    'pitch': 1,
    'voice': 'Google UK English Female',
    'splitSentences': true,
    'listeners': {
        'onvoiceschanged': (voices) => {
            console.log("Event voiceschanged", voices)
        }
    }
}).then((data) => {
    // The "data" object contains the list of available voices and the voice synthesis params
    console.log("Speech is ready, voices are available", data)
}).catch(e => {
    console.error("An error occured while initializing : ", e)
})

class App extends React.Component {

    constructor() {
        console.log(increment);
        super();
        this.state = {
            sender: ["Hi I am Bot!!! What can I do for you today..."],
            receiver: [""],
            suggestions: [],
            showBot: false
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
            this.setState({
                sender: [...this.state.sender, message]
            })
            document.getElementById("sendermessage").value = "";
            this.setState({
                suggestions: []
            })
            detectIntent(message).then(data => {
                if (data.success && data.message) {
                    // var message = data.message;
                    // speech.speak({
                    //     text: message,
                    // }).then(() => {
                    //     console.log("Success !")
                    // }).catch(e => {
                    //     console.error("An error occurred :", e)
                    // })

                    if (data.suggestions.length > 0) {
                        this.setState({
                            suggestions: data.suggestions
                        })
                    }
                    this.setState({
                        receiver: [...this.state.receiver, data.message]
                    })
                } else {
                    let message = "There is an error while processing your request, please try after sometime.";

                    this.setState({
                        receiver: [...this.state.receiver, message]
                    })
                }
            }).catch(err => {
                console.log(err);
                var message = "There is an error while processing your request, please try after sometime.";
                this.setState({
                    receiver: [...this.state.receiver, message]
                })
                this.setState({
                    receiver: [...this.state.receiver, message]
                })
            })
        } else {
            alert("Please Enter message");
        }
    }

    toggleShowBot() {
        this.setState({
            showBot: !this.state.showBot
        })
    }



    render() {

        //const { transcript, resetTranscript, startListening, stopListening } = this.props;
        var showBotClass = this.state.showBot ? 'chat_window' : 'chat_window d-none';

        return (


            <div className="container">

                <button className="btn btn-primary bottombutton" onClick={e => this.toggleShowBot()}>Click Me</button>
                <button onClick={() => this.props.increment()}> + </button>
                <button onClick={() => this.props.decrement()}> - </button>
                <h1>Counter: {this.props.counter}</h1>

                <div className={showBotClass}>

                    <div className="top_menu">
                        <div className="title">Chat</div>
                    </div>
                    <Messagelist onclicksuggestion={(querytext) => {
                        this.onClickSend(querytext);
                    }} sender={this.state.sender}
                        receiver={this.state.receiver}
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
                                this.onClickSend()
                            }}>Send</div>
                        </div>

                        {/* <div className="send_message">
                            <div className="text" id="mic" onClick={(e) => {
                                document.getElementById("mic").innerHTML = ReactDOMServer.renderToString(<BsThreeDots></BsThreeDots>);
                                resetTranscript();
                                startListening();
                                setTimeout(() => {
                                    stopListening();
                                    this.onClickSend(document.getElementById("transcriptedvalue").innerHTML);
                                    document.getElementById("mic").innerHTML = ReactDOMServer.renderToString(<BsFillMicFill></BsFillMicFill>);
                                }, 5000)
                            }}><BsFillMicFill>...</BsFillMicFill></div>
                        </div> */}
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
        counter: state.counter
    }
};

const mapDispatchToProps = () => {
    return {
        increment,
        decrement
    };
}

export default connect(mapStateToProps, mapDispatchToProps())(App);