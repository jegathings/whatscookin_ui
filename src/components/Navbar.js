
import { useHistory} from 'react-router';
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
          <h1><a href="/">Whats Cookin</a></h1>
        </div>
        <nav className="navbar_container">
          <div className="navbar_item">
            {
              this.props.auth.isAuthenticated && (
                <a href="/create" className="create_button">
                  Create Recipe
                </a>
              )
            }
          </div>
          <div className="navbar_item">
            <div >
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <div >
                  Hi {this.props.auth.user.username}
                </div>
              )}
            </div>
            <div>
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
                <div className="logout_button" onClick={this.handleLogOut}>logout</div>
              )}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
