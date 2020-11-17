import React, { useState, useContext } from 'react';
import AuthService from '../../Services/AuthService';
// import Message from '../Components/Message';
import { Link } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "../layout/Layout";

const Login = props => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleForgot = ()=>{
        AuthService.register(user).then(data => {
            const { message } = data;
                props.history.push('/forgot');
          });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            console.log(data);
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/dashboard');
            }
            else
                setMessage(message);
        });
    }



    return (
        <div>
            <Layout header="Log in">
                <Form onSubmit={onSubmit}>
                    <Form.Input
                        fluid
                        icon="user"
                        name="email"
                        iconPosition="left"
                        onChange={onChange}
                        placeholder="E-mail address"
                        className="auth-input-field"
                    />
                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        onChange={onChange}
                        placeholder="Password"
                        type="password"
                        className="auth-input-field"
                    />
                    <Button color="teal" fluid size="huge">
                        Login
                            </Button>
                    <Message size="big">
                        <Link to="/signup">Not Registered?</Link>
                    </Message>
                </Form>
                <Button onClick={handleForgot}
                    size="small">
                        Forgot Password?
                </Button>
            </Layout>
            {/* {message ? <Message message={message} /> : null} */}
        </div>
    )
}

export default Login;