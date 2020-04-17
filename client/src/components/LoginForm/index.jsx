// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';

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

// ----------------- LoginForm ------------------

const LoginForm = props => {
	const currentUser = useContext(CurrentUserContext),
		status = useContext(StatusContext);

	const [ username, setUsername ] = useState(''),
		[ password, setPassword ] = useState('');

	useEffect(() => {
		status.reset()();
		status.setCode(200)();
		// eslint-disable-next-line
	}, []);

	const submitForm = e => {
		e.preventDefault();
		if (username !== '' && password !== '') {
			const user = { username, password };
			API.User
				.login(user)
				.then(response => {
					if (response.data.status === 200) {
						status.setCode(200)();
						status.setSuccess(
							"You've been successfully logged in."
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
					<p>{status.state.error}</p>
				</div>
			)}

			<form>
				<InputGroup
					name="username"
					label="Username"
					type="text"
					placeholder="raduser420"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<InputGroupPassword
					name="password"
					label="Password"
					type="password"
					placeholder="raduser420"
					showGlyph="Show"
					hideGlyph="Hide"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<Button value="Login" onClick={submitForm} />
			</form>
		</div>
	);
};

export default LoginForm;
