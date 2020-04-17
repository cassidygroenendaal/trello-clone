// ----------------- Dependencies ------------------

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { StatusContext } from '../../contexts/StatusContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Components ------------------

import Button from '../../components/Button';
import EditUserForm from '../../components/EditUserForm';

// ----------------- MyAccount Page ------------------

const MyAccount = props => {
	const currentUser = useContext(CurrentUserContext),
		status = useContext(StatusContext);

	const [ isEditing, setIsEditing ] = useState(false),
		[ user, setUser ] = useState({});

	useEffect(
		() => {
			API.User.getOne(currentUser.state.id).then(response => {
				if (response.data.status === 200) {
					setUser(response.data.user);
				} else {
					status.setError(response.data.message)();
					status.setCode(response.data.status)();
				}
			});
		},
		[ currentUser, status ]
	);

	return (
		<div>
			{currentUser.state.isAuth && (
				<p>Welcome, {currentUser.state.username}</p>
			)}
			<h1>This is the My Account page!</h1>

			<Link to="/">Home</Link>
			<Link to={`/u/${currentUser.state.id}`}>
				View as a normal user
			</Link>
			{!isEditing && (
				<Button
					value="Edit Info"
					onClick={() => setIsEditing(!isEditing)}
				/>
			)}

			<h2>CurrentUser State</h2>
			<h3>{currentUser.state.username}</h3>
			<h3>{currentUser.state.email}</h3>
			<h3>{currentUser.state.id}</h3>
			<hr />
			<h2>Retrieved State</h2>
			<h3>{user.username}</h3>
			<h3>{user.email}</h3>
			<h3>{user._id}</h3>

			{isEditing && (
				<EditUserForm
					user={user}
					setUser={setUser}
					onClick={() => setIsEditing(!isEditing)}
				/>
			)}
		</div>
	);
};

export default MyAccount;
