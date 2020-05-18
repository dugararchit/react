import React from 'react';
import "./App.css";
import Suggestions from './Suggestions';
class Messagelist extends React.Component {

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        var objDiv = this.messagesEnd;
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    handleSuggestionClick(querytext) {
        this.props.onclicksuggestion(querytext);
    }

    render() {
        // console.log(this.props)
        return (
            <ul className="messages" ref={(el) => { this.messagesEnd = el; }}>
                {this.props.sender.map((item, index) => {
                    
                    var receiver = "";
                    if (this.props.receiver[index] && this.props.receiver[index].length > 0) {
                        receiver = <li className="message left appeared">
                            <div className="avatar"></div>
                            <div className="text_wrapper">
                                <div className="text" dangerouslySetInnerHTML={{ __html: this.props.receiver[index] }}></div>
                            </div>
                        </li>
                    }
                    if (index === 0) {
                        receiver = <li className="message right appeared">
                            <div className="avatar"></div>
                            <div className="list-group px-2">
                                <button type="button" className="list-group-item list-group-item-action" onClick={() => this.props.onclicksuggestion("field operator")}><b>Steps- Field Operator</b></button>
                                <button type="button" className="list-group-item list-group-item-action" onClick={() => this.props.onclicksuggestion("property source")} ><b>Steps- Property source</b></button>
                                <button type="button" className="list-group-item list-group-item-action" onClick={() => this.props.onclicksuggestion("Hi")}><b>Say hi to bot</b></button>
                            </div>
                        </li>
                    }
                    return (<div key={index}>
                        <li className="message right appeared">
                            <div className="avatar"></div>
                            <div className="text_wrapper">
                                <div className="text"> {item} </div>
                            </div>
                        </li>
                        {receiver}
                    </div>)
                })}
                <Suggestions onclicksuggestion={(querytext) => this.handleSuggestionClick(querytext)} suggestions={this.props.suggestions}></Suggestions>
            </ul>
            // <div className="Messages">
            //     <div className="Messages_list">
            //         <div className="container">
            //             {
            //                 this.props.sender.map((item, index) => {
            //                     return (<div className="row" key={index}>
            //                         <div className="col-md-10 sender">{item}</div>
            //                         <div className="col-md-10 receiver text-right">{this.props.receiver[index]}</div>
            //                     </div>)
            //                 })
            //             }
            //         </div>
            //     </div>
            // </div>
        )
    }
};

export default Messagelist;