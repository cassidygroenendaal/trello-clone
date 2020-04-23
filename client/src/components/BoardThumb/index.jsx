// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { StatusContext } from '../../contexts/StatusContext';
// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

// import InputGroup from '../InputGroup';
// import TextareaGroup from '../TextareaGroup';
// import Button from '../Button';

// ----------------- EditUserForm ------------------

const BoardThumb = props => {
	// const currentUser = useContext(CurrentUserContext);
	// const [ status, setStatus ] = useState({
	// 		code    : null,
	// 		error   : null,
	// 		success : null
	// 	}),
	// 	[ user, setUser ] = useState(currentUser);

	// useEffect(
	// 	() => {
	// 		API.User.getOne(currentUser.state.id).then(response => {
	// 			if (response.data.status === 200) {
	// 				setUser(response.data.user);
	// 			} else {
	// 				status.setError(response.data.message)();
	// 				status.setCode(response.data.status)();
	// 			}
	// 		});
	// 	},
	// 	[ currentUser, status ]
	// );

	// const setUsername = username => setUser({ ...user, username }),
	// 	setEmail = email => setUser({ ...user, email }),
	// 	setFullname = fullname => setUser({ ...user, fullname }),
	// 	setInitials = initials => setUser({ ...user, initials }),
	// 	setBio = bio => setUser({ ...user, bio });

	// const listSkipped = [
	// 	'id',
	// 	'resetPasswordExpires',
	// 	'resetPasswordToken',
	// 	'createdAt',
	// 	'updatedAt',
	// 	'salt',
	// 	'password'
	// ];

	// const checkForm = user => {
	// 	for (let key in user) {
	// 		if (!listSkipped.includes(key)) {
	// 			// If even one key has a value, return true
	// 			if (user[key]) return true;
	// 		}
	// 	}
	// 	return false;
	// };

	// const submitForm = e => {
	// 	e.preventDefault();

	// 	if (checkForm(user)) {
	// 		const updatedUser = {};

	// 		for (let key in user) {
	// 			if (user[key] !== '' && !listSkipped.includes(key)) {
	// 				updatedUser[key] = user[key];
	// 			}
	// 		}

	// 		API.User
	// 			.updateOne(currentUser.state.id, updatedUser)
	// 			.then(response => {
	// 				if (response.data.status === 200) {
	// 					setStatus({
	// 						code    : 200,
	// 						error   : null,
	// 						success :
	// 							'Your information has been successfully updated!'
	// 					});
	// 					currentUser.setUser(response.data.user)();
	// 					props.onClick();
	// 				} else {
	// 					setStatus({
	// 						code    : response.data.status,
	// 						error   : response.data.message,
	// 						success : null
	// 					});
	// 				}
	// 			})
	// 			.catch(err => console.log(err));
	// 	}
	// };

	return (
		<Link to={`/b/${props.board.id}`} className={styles.container}>
			{props.board.background[0] === '#' ? (
				<div
					className={styles.colorBG}
					style={{ backgroundColor: props.board.background }}
				/>
			) : (
				<img
					className={styles.imageBG}
					src={props.board.background}
					alt="background"
				/>
			)}
			<div className={styles.content}>
				<h2 className={styles.title}>{props.board.title}</h2>
				<button onClick={props.starBoard}
					className={
						props.board.isStarred ? styles.isStarred : styles.star
					}
				>
					*
				</button>
			</div>
		</Link>
	);
};

export default BoardThumb;
