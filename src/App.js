import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ViewRecipe from './components/ViewRecipe'
import Recipe from './components/Recipe';
import EditRecipe from './components/EditRecipe';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import Footer from './components/Footer';
import { Auth } from 'aws-amplify';

class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }
  async componentWillMount(){
    console.log("%cComponent will mount","color:yellow");
  }
  async componentDidCatch() {
    console.log("%cComponent did catch","color:yellow");
  }
  async componentDidUpdate() {
    console.log("%cComponent did update","color:yellow");
  }
  async componentWillUnmount() {
    console.log("%cComponent will unmount","color:yellow");
  }
  async componentWillReceiveProps(){
    console.log("%ccomponentWillReceiveProps","color:yellow");
  }
  async componentDidMount() {
    try {
      console.log("%cComponent did mount","color:yellow");
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log("%cSession","color:yellow",session);
      const user = await Auth.currentAuthenticatedUser();
      //    const cognito_id = props.auth.user.attributes.sub;
      console.log("%cUser","color:yellow",user);
      console.log("%cAttributes","color:yellow",user.attributes);
      this.setUser(user);
    } catch (error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps} />
            <div className="index_panel">
              <Switch>
                <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
                <Route exact path="/create" render={(props) => <Recipe method="POST" {...props} auth={authProps} formData={{ ...{}, formTitle: "Create Recipe" }} />} />
                <Route exact path="/edit/:recipe_id" render={(props) => <EditRecipe method="PUT" {...props} auth={authProps} formData={{ ...{}, formTitle: "Edit    Recipe" }} />} />
                <Route exact path="/view/:recipe_id" render={(props) => <ViewRecipe {...props} auth={authProps} />} />
                <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
                <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
                <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
                <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
                <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
                <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
                <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
