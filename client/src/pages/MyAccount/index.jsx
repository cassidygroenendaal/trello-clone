// ----------------- Dependencies ------------------

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

// import styles from './style.module.css';

// ----------------- Components ------------------

import PrivateRoute from '../../components/PrivateRoute';

import AccountHeader from '../../components/AccountHeader';

import EditProfileForm from '../../components/EditProfileForm';
import AssignedCards from '../../components/AssignedCards';

// ----------------- Pages ------------------

import { _404 } from '../index';

// ----------------- MyAccount Page ------------------

const MyAccount = props => {

	const { path } = useRouteMatch();

	return (
		<div>
			<AccountHeader />
			<main>
				<Switch>
					<PrivateRoute
						exact
						path={path}
						component={EditProfileForm}
					/>
					<PrivateRoute
						exact
						path={`${path}/cards`}
						component={AssignedCards}
					/>
					<Route component={_404} />
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
