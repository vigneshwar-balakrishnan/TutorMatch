import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../../Services/AuthService';
// import Message from '../Components/Message';
import { Link } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "../layout/Layout";

const Register = props => {
  const [user, setUser] = useState({ username: "", password: "", role: "user" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    }
  }, []);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  }

  const onSubmit = e => {
    e.preventDefault();
    AuthService.register(user).then(data => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push('/login');
        }, 2000)
      }
    });
  }



  return (
    <div>
      <Layout header="Sign up to get started">
        <Form onSubmit={onSubmit}>

          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            name="username"
            onChange={onChange}
            placeholder="E-mail address"
            className="auth-input-field"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            name="password"
            onChange={onChange}
            type="password"
            className="auth-input-field"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            type="password"
            className="auth-input-field"
          />

          <Button color="teal" fluid size="huge">
            Sign up
          </Button>
        </Form>

        <Message size="big">
          <Link to="/login">Already Registered?</Link>
        </Message>
      </Layout>
      {/* {message ? <Message content={message.msgError}/> : null} */}
    </div>
  )
}

export default Register;