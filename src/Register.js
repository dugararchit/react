import React, { Component } from 'react';
import FormMessage from './theMessage';
import { auth } from "./firebase";
import { navigate } from "@reach/router";
class Register extends Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            passOne: '',
            passTwo: '',
            formSuccess: false,
            theMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    async formSubmit(e) {
        e.preventDefault();
        alert("Submitting Form");
        try {
            const { user } = await auth.createUserWithEmailAndPassword(this.state.email, this.state.passOne);
            if (!user) alert("User not saved successfully!!! Please try after sometime");
            auth.currentUser.updateProfile({
                displayName: this.state.displayName
            }).then(() => {
                console.log("Updated");
                this.props.updateUserDetail(user);
                this.setState({
                    displayName: '',
                    email: '',
                    passOne: '',
                    passTwo: '',
                });
                navigate("/");
            }, function (error) {
                console.log("Error happened");
            });
        } catch (error) {
            console.log(error);
            this.setState({
                theMessage: error.message,
                formSuccess: false,
            });
            console.error("Error creating user document", error);
        }
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;
        this.setState({ [itemName]: itemValue }, () => {
            if (this.state.passOne !== this.state.passTwo) {
                this.setState({
                    theMessage: "Password do not match",
                    formSuccess: false,
                });
            } else {
                this.setState({
                    theMessage: "",
                    formSuccess: false,
                });
            }
        });
    }

    render() {
        return (
            <form className="mt-3" onSubmit={this.formSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h3 className="font-weight-light mb-3">Register</h3>
                                    <FormMessage message={this.state.theMessage} formSuccess={this.state.formSuccess} />
                                    <div className="form-row">
                                        <section className="col-sm-12 form-group">
                                            <label
                                                className="form-control-label sr-only"
                                                htmlFor="displayName"
                                            >
                                                Display Name
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="displayName"
                                                placeholder="Display Name"
                                                name="displayName"
                                                required
                                                value={this.state.displayName}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                    </div>
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
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="passOne"
                                                placeholder="Password"
                                                value={this.state.passOne}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                required
                                                name="passTwo"
                                                placeholder="Repeat Password"
                                                value={this.state.passTwo}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                    </div>
                                    <div className="form-group text-right mb-0">
                                        <button className="btn btn-primary" type="submit">
                                            Register
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

export default Register;