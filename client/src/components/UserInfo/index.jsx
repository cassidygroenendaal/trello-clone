// ----------------- Dependencies ------------------

import React, { useState, useEffect, useContext } from 'react';

// ----------------- Other Dependencies ------------------

import { StatusContext } from '../../contexts/StatusContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- UserInfo ------------------

const UserInfo = props => {
	const status = useContext(StatusContext);

	const [ user, setUser ] = useState({});

	useEffect(
		() => {
			API.User.getOne(props.match.params.id).then(response => {
				if (response.data.status === 200) {
					console.log(response.data.user);
					setUser(response.data.user);
				} else {
					status.setError(response.data.message)();
					status.setCode(response.data.status)();
				}
			});
		},
		// eslint-disable-next-line
		[ props.match.params.id ]
	);

	return (
		<div>
			<h1>{user.username}</h1>
			<h3>{user.email}</h3>
		</div>
	);
};

export default UserInfo;
