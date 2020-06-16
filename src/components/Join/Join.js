// Import React
import React, { useState } from 'react';
import { Link } from "@reach/router";

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('js');

  return (
    <div>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">AD</h5>
        {/* <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="#">Features</a>
          <a className="p-2 text-dark" href="#">Enterprise</a>
          <a className="p-2 text-dark" href="#">Support</a>
          <a className="p-2 text-dark" href="#">Pricing</a>
        </nav> 
        <a className="btn btn-outline-primary" href="#">Sign up</a>
        */}
      </div>

      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">JOIN</h1>

      </div>

      <div className="container">
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input required type="text" autoComplete="off" name="name" onChange={e => setName(e.target.value)} className="form-control" id="name" placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="room">Room</label>
            <input required autoComplete="off" type="text" name="room" value={room} className="form-control" onChange={e => setRoom(e.target.value)} id="room" placeholder="Enter room" />
          </div>
          <Link to={`/chat?name=${name}&room=${room}`}>
            <button type="submit" className="btn btn-primary">Submit</button>
          </Link>
        </form>
      </div >
    </div >
  );
}

export default Join;
