import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../../Services/AuthService';
// import Message from '../Components/Message';
import { Link } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "../layout/Layout";

const ConfirmPassword = props => {
  const [otp, setOTP] = useState({ otp: ""});
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    }
  }, []);

  const onChange = e => {
    setOTP({ ...otp, [e.target.name]: e.target.value });
  }

  const resetForm = () => {
    setOTP({ otp: "" });
  }

  const onSubmit = e => {
    e.preventDefault();
    AuthService.register(otp).then(data => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push('/dashboard');
        }, 2000)
      }
    });
  }



  return (
    <div>
      <Layout header="Enter the OTP received">
        <Form onSubmit={onSubmit}>
          <Form.Input
            fluid
            icon="bullseye"
            iconPosition="left"
            name="otp"
            onChange={onChange}
            placeholder="OTP"
            className="auth-input-field"
          />

          <Button color="teal" fluid size="huge">
              Submit
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