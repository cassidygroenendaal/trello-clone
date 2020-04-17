// ----------------- Dependencies ------------------

import React from 'react';
import { Link } from 'react-router-dom';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Components ------------------

import UserInfo from '../../components/UserInfo';

// ----------------- UserProfile Page ------------------

const UserProfile = props => {
	return (
		<div>
			<h1>This is the User Profile page!</h1>

			<Link to="/">Home</Link>
			<UserInfo {...props} />
		</div>
	);
};

export default UserProfile;
