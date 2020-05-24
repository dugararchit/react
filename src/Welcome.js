import React, { Component } from 'react';
import { Link } from "@reach/router"
class Welcome extends Component {
    render() {
        const { user, signOutUser } = this.props;
        return (
            <div className="text-center mt-4">
                <span className="text-secondary font-weight-bold pl-1">
                    Welcome {user}
                </span>
        ,
                <Link onClick={(e) => signOutUser(e)} className="nav-item nav-link" to="/">
                    log out
              </Link>
            </div>
        );
    }
}

export default Welcome;