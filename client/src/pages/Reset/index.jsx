// ----------------- Dependencies ------------------

import React from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Components ------------------

import ResetForm from '../../components/ResetForm';

// ----------------- Reset Page ------------------

const Reset = props => {
	return (
		<div>
			<h1>This is the Login page!</h1>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			<Link to="/contact">Contact</Link>
			<Link to="/contacts">Contacts?</Link>
			<button onClick={API.User.logout}>Logout</button>

			<ResetForm {...props} />
		</div>
	);
};

export default Reset;
