// ----------------- Dependencies ------------------

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- PrivateRoute ------------------

const PublicOnlyRoute = ({ component: Component, ...rest }) => {
	const currentUser = useContext(CurrentUserContext);

	return (
		<Route
			{...rest}
			render={props =>
				!currentUser.state.isAuth ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/', state: { from: props.location } }}
					/>
				)}
		/>
	);
};

export default PublicOnlyRoute;
