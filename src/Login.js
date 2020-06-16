import React, { Component } from 'react';
import FormMessage from './theMessage';
import { auth } from "./firebase";
import { navigate } from "@reach/router";
class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            formSuccess: false,
            theMessage: "",
            rememberme: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount() {
        
        if (localStorage.getItem("userdetails") != null) {
            var jsonParse = JSON.parse(localStorage.getItem("userdetails"));
            // alert(jsonParse.pass);
            this.setState({
                email: jsonParse.email,
                password: jsonParse.pass,
                rememberme: true
            });
            
        }
    }

    async formSubmit(e) {
        e.preventDefault();
        try {
            const { user } = await auth.signInWithEmailAndPassword(this.state.email, this.state.password);
            console.log(user);
            if (!user) alert("User not logged in!!! Please try after sometime");
            else {
                this.props.updateUserDetail(user);
                if (this.state.rememberme == true)
                    localStorage.setItem("userdetails", JSON.stringify({ email: this.state.email, pass: this.state.password }))
                else
                    localStorage.removeItem("userdetails");
            }
            this.setState({
                email: '',
                password: '',
                rememberme: false
            });
            document.getElementById("rememberme").checked = false;
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.code === "auth/user-not-found") {
                error.message = "Invalid user please try with another user";
            }
            this.setState({
                theMessage: error.message,
                formSuccess: false,
            });
            console.error("Error creating user document", error);
        }
    }

    handleChange(e) {
        const itemName = e.target.name;
        var itemValue = e.target.value;

        if (itemName === "rememberme") {
            itemValue = e.target.checked
        }

        this.setState({ [itemName]: itemValue });
    }

    render() {
        return (
            <form className="mt-3" onSubmit={this.formSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h3 className="font-weight-light mb-3">Login</h3>
                                    <FormMessage message={this.state.theMessage} formSuccess={this.state.formSuccess} />
                                    <section className="form-group">
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="email"
                                        >
                                            Email
                    </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            placeholder="Email Address"
                                            required
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </section>
                                    <div className="form-row">
                                        <section className="col-sm-12 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox" checked={this.state.rememberme} id="rememberme" className="form-check-input"
                                            name="rememberme"
                                            onChange={this.handleChange} />
                                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                                    </div>
                                    <div className="form-group text-right mb-0">
                                        <button className="btn btn-primary" type="submit">
                                            Login
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default Login;