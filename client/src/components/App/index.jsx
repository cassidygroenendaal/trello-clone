// ----------------- Dependencies ------------------

import React, { useEffect, useContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { StatusContext } from '../../contexts/StatusContext';

import API from '../../lib/API';
// import useTokenStore from '../../lib/TokenStore';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Components ------------------

import PrivateRoute from '../PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute';

import Footer from '../Footer';

// ----------------- Pages ------------------

import {
	Landing,
	Register,
	Login,
	Forgot,
	Reset,
	Contact,
	UserProfile,
	CookiePolicy,
	MyAccount,
	_404
} from '../../pages';
// ----------------- App ------------------

const App = () => {
	const currentUser = useContext(CurrentUserContext);
	const status = useContext(StatusContext);

	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			if (currentUser.state.authToken) {
				API.User
					.getMe(currentUser.state.authToken)
					.then(response => {
						if (response.data.status === 200) {
							status.setCode(200)();
							status.setSuccess(
								"You've been successfully logged in."
							)();
							currentUser.setUser(response.data.user)();
						} else {
							status.setError(response.data.message)();
							status.setCode(response.data.status)();
							currentUser.reset()();
						}
						setIsLoading(false);
					})
					.catch(err => {
						console.log(err);
						currentUser.logout()();
						setIsLoading(false);
					});
			} else {
				setIsLoading(false);
			}
		},
		// eslint disable next line;
		[]
	);

	return (
		<div className="App">
			{isLoading ? (
				<div>Loading......</div>
			) : (
				<div>
					<Switch>
						<Route exact path="/" component={Landing} />
						<PublicOnlyRoute
							exact
							path="/register"
							component={Register}
						/>
						<PublicOnlyRoute exact path="/login" component={Login} />
						<Route exact path="/forgot" component={Forgot} />
						<Route exact path="/reset/:token" component={Reset} />
						<Route exact path="/u/:id" component={UserProfile} />
						<Route exact path="/contact" component={Contact} />
						<PrivateRoute
							exact
							path="/my-account"
							component={MyAccount}
						/>
						<Route
							exact
							path="/cookie-policy"
							component={CookiePolicy}
						/>
						<Route component={_404} />
					</Switch>
					<Footer />
				</div>
			)}
		</div>
	);
};

export default App;
