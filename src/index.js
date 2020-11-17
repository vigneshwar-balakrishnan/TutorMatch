import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
// import "semantic-ui-less/semantic.less";
import './index.css';
import App from './App';
import AuthProvider from './Context/AuthContext';

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById('root'));


