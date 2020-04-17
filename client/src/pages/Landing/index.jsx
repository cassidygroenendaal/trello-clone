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

	const logout = () =>
		API.User
			.logout()
			.then(response => currentUser.reset()())
			.catch(err => console.log(err));

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
				<button onClick={logout}>Logout</button>
				{currentUser.state.isAuth && (
					<Link to="/my-account">My Profile</Link>
				)}
			</div>
			<UserList />
		</div>
	);
};

export default Landing;
