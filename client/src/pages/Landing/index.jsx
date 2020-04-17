// ----------------- Dependencies ------------------

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Components ------------------

import UserList from '../../components/UserList';

// ----------------- Landing Page ------------------

const Landing = props => {
	const currentUser = useContext(CurrentUserContext);

	const logout = () => currentUser.logout()();

	return (
		<div>
			<div>
				{currentUser.state.isAuth && (
					<p>Welcome, {currentUser.state.username}</p>
				)}
				<h1>This is the Landing page!</h1>
				<Link to="/register">Register</Link>
				<Link to="/login">Login</Link>
				<Link to="/contact">Contact</Link>
				<Link to="/contacts">Contacts?</Link>
				{currentUser.state.isAuth && (
					<div>
						<button onClick={logout}>Logout</button>
						<Link to="/my-account">My Profile</Link>
					</div>
				)}
			</div>
			<UserList />
		</div>
	);
};

export default Landing;
