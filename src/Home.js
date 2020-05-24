import React from 'react';
import { Link } from "@reach/router";
class Home extends React.Component {
  render() {
    const biggerLead = {
      fontSize: 1.4 + 'em',
      fontWeight: 200
    };

    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <div
              className="display-4 text-primary mt-3 mb-2"
              style={{
                fontSize: 2.8 + 'em'
              }}
            >
              Meeting Log
            </div>
            <p className="lead" style={biggerLead}>
              This simple app creates meetings, allows people to check
              in, and picks random users to award giveaways. It's a
              good example of a Single Page Application which includes
              connection to a database and routing. It's a practical
              way to learn <a to="https://reactjs.org/">React</a>
              with <a to="https://firebase.google.com">Firebase</a>.
            </p>

            <Link
              to="/register"
              className="btn btn-outline-primary mr-2"
            >
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-primary mr-2">
              Log In
            </Link>
            <Link to="/meetings" className="btn btn-primary">
              Meetings
            </Link>
          </div>{' '}
          {/* columns */}
        </div>
      </div>
    );
  }
}

export default Home;