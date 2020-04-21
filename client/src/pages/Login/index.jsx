// ----------------- Dependencies ------------------

import React from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Components ------------------

import LoginForm from '../../components/LoginForm';

// ----------------- Login Page ------------------

const Login = props => {
	return (
		<div>
			<h1>This is the Login page!</h1>
			<Link to="/">Home</Link>
			<Link to="/register">Register</Link>
			<Link to="/contact">Contact</Link>
			<Link to="/contacts">Contacts?</Link>
			<LoginForm {...props} />
			<Link to="/forgot">Forgot my password</Link>
		</div>
	);
};

export default Login;
