import React, { Component } from 'react';

class Welcome extends Component {
    render() {
        const { displayName, userId } = this.props;
        return (
            <div className="text-center mt-4">
                <span >
                    Welcome  
                </span>
        <span className="text-secondary font-weight-bold pl-1"> {displayName}</span>
            </div>
        );
    }
}

export default Welcome;