import React from 'react';
import "./App.css";
class Suggestions extends React.Component {
    render() {
        if (this.props.suggestions.length > 0) {
            return (
                <li className="message right appeared">
                    {/* <div className="avatar"></div> */}
                    <div className="px-5">
                        {
                            this.props.suggestions.map((item, index) => {
                                var phrase = item.phrase;
                                return (<button key={index} onClick={() => this.props.onclicksuggestion(phrase)} className="btn btn-primary">{item.text}</button>)
                            })
                        }
                    </div>
                </li>
            )
        } else {
            return (<p></p>);
        }
    }
};

export default Suggestions;