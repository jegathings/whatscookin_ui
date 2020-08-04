import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      console.log("Start Logout");
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      console.log("Auth",this.props.auth);
      console.log("End Logout");
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <div>
        <div className="title">
          <h1><a href="/">Whats Cookin</a></h1>
        </div>
        <nav >
          <div className="navbar_sub_item">
            {
              this.props.auth.isAuthenticated && (
                <a href="/create" className="button is-light">
                  Create Recipe
                </a>
              )
            }
          </div>
          <div className="navbar_item">
            <div className="navbar_sub_item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <div >
                  Hello {this.props.auth.user.username}
                </div>
              )}
            </div>
            <div className="navbar_sub_item">
              {!this.props.auth.isAuthenticated && (
                <div>
                  <a href="/register">
                    <strong>Register</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                    </a>
                </div>
              )}
              {this.props.auth.isAuthenticated && (
                <div className="button" onClick={this.handleLogOut}>logout</div>
              )}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
