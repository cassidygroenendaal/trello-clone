// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { StatusContext } from '../../contexts/StatusContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- Components ------------------

import InputGroupPassword from '../../components/InputGroupPassword';
import Button from '../../components/Button';

// ----------------- ResetForm ------------------

const ResetForm = props => {
	const status = useContext(StatusContext),
		currentUser = useContext(CurrentUserContext);

	const [ id, setId ] = useState(''),
		[ password, setPassword ] = useState('');

	useEffect(
		() => {
			API.User
				.findResetUser(props.match.params.token)
				.then(response => {
					if (response.data.status === 200) {
						setId(response.data.userId);
						status.setCode(200)();
						status.setSuccess('User found.')();
					} else {
						status.setError(response.status.message)();
						status.setCode(response.data.status)();
					}
				})
				.catch(err => console.log(err.data));
		},
		// eslint-disable-next-line
		[ props.match.params.token ]
	);

	const submitForm = e => {
		e.preventDefault();
		if (password !== '') {
			const user = { id, password };
			API.User
				.resetPassword(user)
				.then(response => {
					console.log(response.data);
					if (response.data.status === 200) {
						status.setCode(200)();
						status.setSuccess(
							'Your password has been successfully reset.'
						)();
						currentUser.setUser(response.data.user)();
						props.history.push('/');
					} else {
						status.setError(response.data.message)();
						status.setCode(response.data.status)();
						currentUser.reset()();
					}
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<div>
			{status.state.code !== 200 && (
				<div>
					<h4>{status.state.error}</h4>
					<Link to="/forgot">Send a new link</Link>
				</div>
			)}

			<form>
				<InputGroupPassword
					name="password"
					label="New Password"
					type="password"
					placeholder="New Password"
					showGlyph="Show"
					hideGlyph="Hide"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>

				<Button value="Reset Password" onClick={submitForm} />
			</form>
		</div>
	);
};

export default ResetForm;
