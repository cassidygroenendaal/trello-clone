// ----------------- Dependencies ------------------

import React from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Components ------------------

import ForgotForm from '../../components/ForgotForm';

// ----------------- Forgot Page ------------------

const Forgot = props => {
	return (
		<div>
			<h1>This is the Login page!</h1>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			<Link to="/contact">Contact</Link>
			<Link to="/contacts">Contacts?</Link>
			<button onClick={API.User.logout}>Logout</button>

			<ForgotForm />
		</div>
	);
};

export default Forgot;
