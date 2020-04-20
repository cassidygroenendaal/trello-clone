// ----------------- Dependencies ------------------

import React, { useState, useContext } from 'react';

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

	const [ oldPassword, setOldPassword ] = useState(''),
		[ newPassword, setNewPassword ] = useState('');

	// const setOldPassword = oldPassword =>
	// 		props.setUser({ ...props.user, oldPassword }),
	// 	setNewPassword = newPassword =>
	// 		props.setUser({ ...props.user, newPassword });

	const checkForm = () => {
		if (oldPassword && newPassword) {
			return true;
		}
		return false;
	};

	const submitForm = e => {
		e.preventDefault();

		if (checkForm()) {

			API.User
				.updateOnePassword(
					currentUser.state.id,
					oldPassword,
					newPassword
				)
				.then(response => {
					if (response.data.status === 200) {
						status.setCode(200)();
						status.setSuccess(
							'Your information has been successfully updated!'
						)();
						// currentUser.setUser(response.data.user)();
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
				<Button value="Update Password" onClick={submitForm} />
			</form>
		</div>
	);
};

export default EditUserForm;
