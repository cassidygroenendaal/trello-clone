// ----------------- Dependencies ------------------

import React from 'react';
import { Link } from 'react-router-dom';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Contact Page ------------------

const Contact = props => {
	return (
		<div>
			<h1>This is the Contact page!</h1>
			<Link to="/">Home</Link>
			<Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
			<Link to="/contacts">Contacts?</Link>
		</div>
	);
};

export default Contact;
