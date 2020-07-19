import React from "react";
// javascript plugin used to create scrollbars on windows
import { NavLink, withRouter } from "react-router-dom";
import "./Auth.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
      isDisabled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
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
    console.log(this.state.email, this.state.password);
    const requestOptions = {
      method: "POST",
      //headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };
    console.log("HItting fetch", requestOptions);
    console.log("http://allysoftwares.com/loginreg/login.php");
    try {
      fetch("https://gpmuk.com/loginreg/login.php", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
          this.setState({
            isDisabled: false
          });
          // this.props.token = "QpwL5tke4Pnpja7X4";
          if (data.success) {
            localStorage.setItem("userData", data.token);
            localStorage.setItem("userEmail", this.state.email);
            this.props.history.push("/");
          } else {
            console.log(data.message);
            this.setState({
              msg: data.message,
            });
          }
          
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            isDisabled: false,
            msg: "Error while processing your request, please try after sometime"
          });
          //this.props.history.push("/register");
        });
    } catch (err) {
      console.log("try catch error", err);
    }
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
                    Login
                  </button>
                  <NavLink className="btn btn-warning" to="register">
                    Register
                  </NavLink>
                  <br />
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
