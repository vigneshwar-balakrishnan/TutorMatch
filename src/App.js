import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Register";
import ConfirmPassword from "./components/auth/ConfirmPass";
import ForgotPassword from "./components/auth/ForgotPass";
import OTP from "./components/auth/OTP";
import Navbar from './components/navbar/Navbar';
import Home from './components/Home';
import Dashboard from "./components/dashboard/Dashboard";
// import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <UnPrivateRoute exact path="/login" component={Login} />
        <UnPrivateRoute exact path="/confirm" component={ConfirmPassword} />
        <UnPrivateRoute exact path="/signup" component={Signup} />
        <Route exact path="/otp" component={OTP} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <UnPrivateRoute exact path="/dashboard" component={Dashboard} />
      </Router>
    );
  }
}
export default App;