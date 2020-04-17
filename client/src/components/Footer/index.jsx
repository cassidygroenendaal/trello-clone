// ----------------- Dependencies ------------------

import React from 'react';
import { Link } from 'react-router-dom';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- Button ------------------

const Footer = props => {
	return (
		<footer>
			<Link to="/cookie-policy">Cookie Policy</Link>
		</footer>
	);
};

export default Footer;
