import React from 'react';
import "./App.css";

class Chathomepage extends React.Component {

    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Chatbot</h1>
                    <p>Demo Chatbot </p>
                    <form className="form-inline">
                        <div className="input-group">
                            <div className="input-group-btn">
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
};

export default Chathomepage;