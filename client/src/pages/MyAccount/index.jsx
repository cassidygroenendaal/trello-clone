// ----------------- Dependencies ------------------

import React, { useContext, useState, useEffect } from 'react';
import { Switch, Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { StatusContext } from '../../contexts/StatusContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import PrivateRoute from '../../components/PrivateRoute';

import EditProfileForm from '../../components/EditProfileForm';
import AssignedCards from '../../components/AssignedCards';
import SettingsForm from '../../components/SettingsForm';

// ----------------- MyAccount Page ------------------

const MyAccount = props => {
	const currentUser = useContext(CurrentUserContext),
		status = useContext(StatusContext);

	const location = useLocation();
	console.log(location.pathname);
	const { url, path } = useRouteMatch();
	console.log('url:', url, 'path:', path);

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
			<header>
				<div>{user.initials}</div>
				<div>{user.fullname}</div>
				<div>@{user.username}</div>
			</header>
			<main>
				<nav>
					<ul>
						<li>
							<Link to={url}>Profile and Visibility</Link>
						</li>
						<li>
							<Link to={`${url}/cards`}>Cards</Link>
						</li>
						<li>
							<Link to={`${url}/settings`}>Settings</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<PrivateRoute
						exact
						path={path}
						component={EditProfileForm}
					/>
					<PrivateRoute
						path={`${path}/cards`}
						component={AssignedCards}
					/>
					<PrivateRoute
						path={`${path}/settings`}
						component={SettingsForm}
					/>
				</Switch>
			</main>
			{/* {currentUser.state.isAuth && (
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
			)} */}

			{/* <h2>CurrentUser State</h2>
			<h3>{currentUser.state.username}</h3>
			<h3>{currentUser.state.email}</h3>
			<h3>{currentUser.state.id}</h3>
			<hr />
			<h2>Retrieved State</h2>
			<h3>{user.username}</h3>
			<h3>{user.email}</h3>
			<h3>{user._id}</h3> */}

			{/* {isEditing && (
				<div>
					<EditUserForm
						user={user}
						setUser={setUser}
						onClick={() => setIsEditing(!isEditing)}
					/>
					<EditPasswordForm
						onClick={() => setIsEditing(!isEditing)}
					/>
				</div>
			)} */}
		</div>
	);
};

export default MyAccount;
