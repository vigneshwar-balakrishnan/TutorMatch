import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../../Services/AuthService';
// import Message from '../Components/Message';
import { Link } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "../layout/Layout";

const ConfirmPassword = props => {
  const [password, setPassword] = useState({ password: "", passwordConfirm: ""});
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    }
  }, []);

  const onChange = e => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  const resetForm = () => {
    setPassword({ password: "", passwordConfirm: "" });
  }

  const onSubmit = e => {
    e.preventDefault();
    AuthService.register(password).then(data => {
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
      <Layout header="Enter New Password">
        <Form onSubmit={onSubmit}>
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
            name="passwordConfirm"
            onChange={onChange}
            placeholder="Confirm Password"
            type="password"
            className="auth-input-field"
          />

          <Button color="teal" fluid size="huge">
              Change Password
          </Button>
        </Form>

        {/* <Message size="big">
          <Link to="/login">Already Registered?</Link>
        </Message> */}
      </Layout>
      {/* {message ? <Message content={message.msgError}/> : null} */}
    </div>
  )
}

export default ConfirmPassword;