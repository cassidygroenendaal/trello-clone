// ----------------- Dependencies ------------------

import React, { useContext } from 'react';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { StatusContext } from '../../contexts/StatusContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
import InputGroupPassword from '../../components/InputGroupPassword';
import Button from '../../components/Button';

// ----------------- EditUserForm ------------------

const EditUserForm = props => {
	const currentUser = useContext(CurrentUserContext),
		status = useContext(StatusContext);

	const setUsername = username =>
			props.setUser({ ...props.user, username }),
		setEmail = email => props.setUser({ ...props.user, email }),
		setOldPassword = oldPassword =>
			props.setUser({ ...props.user, oldPassword }),
		setNewPassword = newPassword =>
			props.setUser({ ...props.user, newPassword });

	const checkForm = user => {
		// Check to make sure the form is filled out
		// listSkipped contains keys to ignore the values of
		// Typically these are default MongoDB values that the
		// user will not be able to change
		const listSkipped = [ '_id', '__v' ];
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

		if (checkForm(props.user)) {
			// Make a new user object that only contains keys
			// that have a value - no blank strings
			// This prevents the user from updating their info
			// with an empty string when they didn't mean to
			const updatedUser = {};

			for (let key in props.user) {
				if (props.user[key] !== '') {
					updatedUser[key] = props.user[key];
				}
			}

			API.User
				.updateOne(currentUser.state.id, updatedUser)
				.then(response => {
					if (response.data.status === 200) {
						status.setCode(200)();
						status.setSuccess(
							'Your information has been successfully updated!'
						)();
						currentUser.setUser(response.data.user)();
						props.onClick();
					} else {
						status.setError(response.data.message)();
						status.setCode(response.data.status)();
					}
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<div>
			{status.state.code !== 200 && (
				<div>
					<p>{status.state.error}</p>
				</div>
			)}

			<form>
				<InputGroup
					name="username"
					label="Username"
					type="text"
					placeholder="raduser420"
					value={props.user.username}
					onChange={e => setUsername(e.target.value)}
				/>
				<InputGroup
					name="email"
					label="E-Mail"
					type="text"
					placeholder="raduser420@hotmail.net"
					value={props.user.email}
					onChange={e => setEmail(e.target.value)}
				/>
				<InputGroupPassword
					name="oldPassword"
					label="Old Password"
					type="password"
					placeholder="raduser420"
					showGlyph="Show"
					hideGlyph="Hide"
					// No password by default, so no value prop given
					// value={props.user.password}
					onChange={e => setOldPassword(e.target.value)}
				/>
				<InputGroupPassword
					name="newPassword"
					label="New Password"
					type="password"
					placeholder="raduser420"
					showGlyph="Show"
					hideGlyph="Hide"
					// No password by default, so no value prop given
					// value={props.user.password}
					onChange={e => setNewPassword(e.target.value)}
				/>
				<Button value="Save Changes" onClick={submitForm} />
			</form>
		</div>
	);
};

export default EditUserForm;