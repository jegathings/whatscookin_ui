import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utils/FormValidation";
import { Auth } from 'aws-amplify';

class ForgotPasswordVerification extends Component {
  state = {
    verificationcode: "",
    email: "",
    newpassword: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  passwordVerificationHandler = async event => {
    console.log("passwordVerificationHandler");
    event.preventDefault();

    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.verificationcode,
        this.state.newpassword
      );
      this.props.history.push("/changepasswordconfirmation");
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section >
        <div >
          <h1>Set new password</h1>
          <p>
            Please enter the verification code sent to your email address below,
            your email address and a new password.
          </p>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.passwordVerificationHandler}>
            <div className="panel_row">
              <span>verification code</span>
              <input
                type="text"
                className="input"
                id="verificationcode"
                aria-describedby="verificationCodeHelp"
                placeholder="Enter verification code"
                value={this.state.verificationcode}
                onChange={this.handleChange}
              />
            </div>
            <div className="panel_row">
              <span>email</span>
              <input
                className="input"
                type="email"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="panel_row">
              <span>password</span>
              <input
                type="password"
                className="input"
                id="newpassword"
                placeholder="New password"
                value={this.state.newpassword}
                onChange={this.handleChange}
              />
            </div>
            <div className="panel_row">
              <button>
                Submit
                </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ForgotPasswordVerification;