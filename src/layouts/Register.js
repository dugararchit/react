import React from "react";
// javascript plugin used to create scrollbars on windows
import { NavLink, withRouter } from "react-router-dom";
import "./Auth.css";
import { Plugins } from "@capacitor/core";
const { PushNotifications } = Plugins;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      msg: "",
      pushtoken: "",
      isDisabled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.push();
  }

  push() {
    // Register with Apple / Google to receive push via APNS/FCM
    //if (this.state.pushtoken == "") {

    // On succcess, we should be able to receive notifications
    PushNotifications.addListener("registration", (token) => {
      console.log("Push registration success, token: " + token.value);
      this.setState({
        pushtoken: token.value,
      });
    });
    //}else{
    //  console.log(`Token already registered ${this.state.pushtoken}`);
    //}
  }

  handleChange(e) {
    const itemName = e.target.name;
    var itemValue = e.target.value;
    this.setState({ [itemName]: itemValue });
  }

  formSubmit = (e) =>  {
    this.setState({
      isDisabled: true
    });
    e.preventDefault();
    console.log(this.state.username, this.state.password);
    
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
    

    PushNotifications.addListener("registration", (token) => {
      console.log("Push registration success, token: " + token.value);
      
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          pushtoken: token.value,
        }),
      };

      fetch(`https://gpmuk.com/loginreg/register.php`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // this.props.token = "QpwL5tke4Pnpja7X4";
          if (data.success === 1) {
            this.props.history.push("/login");
          } else
            this.setState({
              msg: data.message,
            });

            this.setState({
              isDisabled: false
            });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            msg: "Error while processing your request please try after sometime",
            isDisabled: false
          });
        });
    });
  }

  render() {
    return (
      <div id="login">
        <h3 className="text-center text-white pt-5">Titan GPM Login form</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" onSubmit={this.formSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={this.state.name}
                      className="form-control"
                      placeholder="Name"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      required
                      type="text"
                      name="email"
                      value={this.state.email}
                      className="form-control"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      required
                      type="password"
                      name="password"
                      value={this.state.password}
                      className="form-control"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </div>
                  <span>{this.state.msg}</span>
                  <br />
                  
                  <button type="submit" className="btn btn-black" disabled={this.state.isDisabled}>
                    Register
                  </button>
                  <br />
                  Already a member, please &nbsp;
                  <NavLink to="login">
                    Login
                  </NavLink>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
