// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { StatusContext } from '../../contexts/StatusContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- Components ------------------

import InputGroup from '../InputGroup';
import TextareaGroup from '../TextareaGroup';
import Button from '../Button';

// ----------------- EditUserForm ------------------

const EditProfileForm = props => {
	const currentUser = useContext(CurrentUserContext);
	const [ status, setStatus ] = useState({
			code    : null,
			error   : null,
			success : null
		}),
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

	const setUsername = username => setUser({ ...user, username }),
		setEmail = email => setUser({ ...user, email });

	const listSkipped = [
		'id',
		'resetPasswordExpires',
		'resetPasswordToken',
		'createdAt',
		'updatedAt',
		'salt',
		'password'
	];

	const checkForm = user => {
		for (let key in user) {
			if (!listSkipped.includes(key)) {
				// If even one key has a value, return true
				if (user[key]) return true;
			}
		}
		return false;
	};

	const submitForm = e => {
		e.preventDefault();

		if (checkForm(user)) {
			const updatedUser = {};

			for (let key in user) {
				if (user[key] !== '' && !listSkipped.includes(key)) {
					updatedUser[key] = user[key];
				}
			}

			API.User
				.updateOne(currentUser.state.id, updatedUser)
				.then(response => {
					if (response.data.status === 200) {
						setStatus({
							code    : 200,
							error   : null,
							success :
								'Your information has been successfully updated!'
						});
						currentUser.setUser(response.data.user)();
						props.onClick();
					} else {
						setStatus({
							code    : response.data.status,
							error   : response.data.message,
							success : null
						});
					}
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<div>
			{status.code !== 200 && (
				<div>
					<p>{status.error}</p>
				</div>
			)}

			<form>
				<InputGroup
					name="fullname"
					label="Full Name"
					type="text"
					placeholder="Enter full name"
					value={user.fullname}
					onChange={e => setUsername(e.target.value)}
				/>
				<InputGroup
					name="initials"
					label="Initials"
					type="text"
					placeholder="Enter initials"
					value={user.initials}
					onChange={e => setUsername(e.target.value)}
				/>
				<InputGroup
					name="username"
					label="Username"
					type="text"
					placeholder="raduser420"
					value={user.username}
					onChange={e => setUsername(e.target.value)}
				/>
				<TextareaGroup
					name="bio"
					label="Bio"
					value={user.bio}
					onChange={e => setUsername(e.target.value)}
				/>
				<InputGroup
					name="email"
					label="E-Mail"
					type="text"
					placeholder="raduser420@hotmail.net"
					value={user.email}
					onChange={e => setEmail(e.target.value)}
				/>
				<Button value="Save" onClick={submitForm} />
			</form>
		</div>
	);
};

export default EditProfileForm;
