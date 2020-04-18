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
				.then(res => {
					console.log(res.data);
					if (res.data.status === 200) {
						setId(res.data.userId);
						status.reset()();
						status.setCode(res.data.status)();
					} else {
						status.setCode(res.data.status)();
						status.setError(res.data.message)();
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
				.then(res => {
					if (res.data.status === 200) {
						status.setCode(200)();
						status.setSuccess(
							'Your password has been successfully reset.'
						)();
						currentUser.setUser(res.data.user)();
						props.history.push('/');
					} else {
						status.setError(res.data.message)();
						status.setCode(res.data.status)();
						currentUser.reset()();
					}
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<div>
			{status.state.code !== undefined &&
			status.state.code !== 200 && (
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
