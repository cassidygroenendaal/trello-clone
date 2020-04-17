// ----------------- Dependencies ------------------

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import API from '../../lib/API';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- UserList ------------------

const UserList = props => {
	const [ listUsers, setListUsers ] = useState([]);

	useEffect(() => {
		API.User
			.getAll()
			.then(response => {
				setListUsers(response.data.users)
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<div>
			{listUsers.length > 0 ? (
				listUsers.map(user => (
					<Link key={user.id} to={`/u/${user.id}`}>
						<h4>{user.username}</h4>
					</Link>
				))
			) : null}
		</div>
	);
};

export default UserList;
