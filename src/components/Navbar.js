
import { useHistory } from 'react-router';
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
      console.log("Auth", this.props.auth);
      console.log("Props", this.props);
      console.log("End Logout");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <div>
        <div className="title">
          <h1>Whats Cookin</h1>
          <h3>Bug Alert Hit refresh to force browser to reload.</h3>
        </div>
        <nav className="navbar_container">
          <div >
            {
              this.props.auth.isAuthenticated && (
                <div className="button">
                  <a href="/create" className="create_button">
                    Create Recipe
                </a>
                </div>
              )
            }
          </div>
          <div className="navbar_item">
            <div >
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <div className="button">
                  Hi {this.props.auth.user.username}
                </div>
              )}
            </div>
            <div>
              {!this.props.auth.isAuthenticated && (
                <div>
                  <a href="/register" className="button">
                    Register
                  </a>
                  <a href="/login" className="button">
                    Login
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
