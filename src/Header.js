import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <main role="main">
                <div className="jumbotron">
                    <div className="container">
                        <br /><br />
                        <h1 className="display-3">{this.props.heading}</h1>
                    </div>
                </div>
            </main>
        );
    }
}

export default Header;