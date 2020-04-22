// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { StatusContext } from '../../contexts/StatusContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

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
		[ user, setUser ] = useState(currentUser);

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
		setEmail = email => setUser({ ...user, email }),
		setFullname = fullname => setUser({ ...user, fullname }),
		setInitials = initials => setUser({ ...user, initials }),
		setBio = bio => setUser({ ...user, bio });

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
		<div className={styles.container}>
			{status.code !== 200 && (
				<div>
					<p>{status.error}</p>
				</div>
			)}

			<div className={styles.image} />

			<h1 className={styles.bigHeading}>
				Manage your personal information
			</h1>
			<p className={styles.text}>
				Control which information people see and Power-Ups may access.
				To learn more, view our <Link className={styles.link} to="/404">Terms of Service</Link> or{' '}
				<Link className={styles.link} to="/404">Privacy Policy</Link>.
			</p>

			<h2 className={styles.heading}>About</h2>

			<form className={styles.form}>
				<InputGroup
					labelClass={styles.label}
					name="fullname"
					label="Full Name"
					type="text"
					placeholder="Enter full name"
					value={user.fullname || ''}
					onChange={e => setFullname(e.target.value)}
				/>
				<InputGroup
					labelClass={styles.label}
					name="initials"
					label="Initials"
					type="text"
					placeholder="Enter initials"
					value={user.initials || ''}
					onChange={e => setInitials(e.target.value)}
				/>
				<InputGroup
					labelClass={styles.label}
					name="username"
					label="Username"
					type="text"
					placeholder="raduser420"
					value={user.username || ''}
					onChange={e => setUsername(e.target.value)}
				/>
				<TextareaGroup
					labelClass={styles.label}
					name="bio"
					label="Bio"
					value={user.bio || ''}
					onChange={e => setBio(e.target.value)}
				/>
				<InputGroup
					labelClass={styles.label}
					name="email"
					label="E-Mail"
					type="text"
					placeholder="raduser420@hotmail.net"
					value={user.email || ''}
					onChange={e => setEmail(e.target.value)}
				/>
				<Button value="Save" onClick={submitForm} />
			</form>
		</div>
	);
};

export default EditProfileForm;
