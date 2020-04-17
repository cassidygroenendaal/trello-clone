// ----------------- Dependencies ------------------

import React from 'react';
import { Link } from 'react-router-dom';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- 404 Page ------------------

const _404 = props => {
	return (
		<div>
			<h1>This is the 404 page!</h1>
			<Link to="/">Home</Link>
			<Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
			<Link to="/contact">Contact</Link>
		</div>
	);
};

export default _404;
