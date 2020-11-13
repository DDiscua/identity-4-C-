import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/Login/SignIn";
import SingUp from "./pages/Login/SingUp";

import MainApp from "./pages/MainApp/MainApp";
import RestrictedRoute from "./util/RestrictedRoute";
import axios from "./util/Api";
import "./App.css";


class App extends Component {
  constructor() {
    super();
    console.log("Starting App");
  }

  componentDidMount() {
    if (this.props.token) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.props.token.access_token;
    }
  }

  componentDidUpdate() {
    if (this.props.token) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.props.token.access_token;
    }
  }



  render() {
    const {
      location,
      token,
      initURL,
      match,
    } = this.props;

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={SingUp} />
            <RestrictedRoute
              path={`${location && location.pathname}`}
              token={token.access_token}
              component={MainApp}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, router }) => {
  const { authUser, token } = auth;
  const { location } = router;
  return { token, authUser, location };

};

export default connect(mapStateToProps, {})(App);
