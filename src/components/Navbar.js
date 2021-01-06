
import { useHistory } from 'react-router';
import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      console.log("%cStart Logout","color:orange");
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      console.log("%cAuth", "color:orange", this.props.auth);
      console.log("%cProps", "color:orange", this.props);
      console.log("%cEnd Logout","color:orange");
      this.props.history.push("/");
      this.props.history.go();
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
