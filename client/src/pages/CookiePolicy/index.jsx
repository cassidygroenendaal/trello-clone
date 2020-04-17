// ----------------- Dependencies ------------------

import React from 'react';
import { Link } from 'react-router-dom';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Contact Page ------------------

const CookiePolicy = props => {
	return (
		<div>
			<h1>This is the Cookie Policy page!</h1>
			<Link to="/">Home</Link>
			<Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
			<Link to="/contacts">Contacts?</Link>
			<div>
				<h2>How do we use cookies?</h2>
				<p>
					We use <strong>session cookies</strong> to keep track of
					whether you are logged in, that way you stay logged in even
					after leaving and coming back to the site. We will log you
					out after 3 weeks for security reasons, but you can log back
					in if you would like.
				</p>
			</div>
		</div>
	);
};

export default CookiePolicy;
