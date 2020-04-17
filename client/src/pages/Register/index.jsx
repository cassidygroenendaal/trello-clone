// ----------------- Dependencies ------------------

import React from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Components ------------------

import RegisterForm from '../../components/RegisterForm';

// ----------------- Register Page ------------------

const Register = props => {
	return (
		<div>
			<h1>This is the Register page!</h1>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="/contact">Contact</Link>
			<Link to="/contacts">Contacts?</Link>
			<button onClick={API.User.logout}>Logout</button>

			<RegisterForm {...props} />
		</div>
	);
};

export default Register;
