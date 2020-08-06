import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utils/FormValidation";
import { Auth } from "aws-amplify";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const { username, email, password } = this.state;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email
        }
      });
      this.props.history.push("/welcome");
      console.log(signUpResponse);
    } catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="panel_c">
              <span>username</span>
              <input
                className="input"
                type="text"
                id="username"
                className="large_input"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="panel_c">
              <span>email</span>
              <input
                className="input"
                type="email"
                id="email"
                className="large_input"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="panel_c">
              <span>password</span>
              <input
                className="input"
                type="password"
                id="password"
                className="large_input"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="panel_c">
              <span>confirm password</span>
              <input
                className="input"
                type="password"
                id="confirmpassword"
                className="large_input"
                value={this.state.confirmpassword}
                onChange={this.handleChange}
              />
            </div>
            <div className="panel_c">
              <button className="button is-success">
                Register
                </button>
            </div>
            <div className="panel_c">
              <a href="/forgotpassword">Forgot password?</a>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Register;