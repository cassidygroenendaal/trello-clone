// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { StatusContext } from '../../contexts/StatusContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
import InputGroupPassword from '../../components/InputGroupPassword';
import Button from '../../components/Button';

// ----------------- RegisterForm ------------------

const RegisterForm = props => {
	const status = useContext(StatusContext),
		currentUser = useContext(CurrentUserContext);

	const location = useLocation();

	const [ username, setUsername ] = useState(''),
		[ email, setEmail ] = useState(
			location.state.email ? location.state.email : ''
		),
		[ password, setPassword ] = useState('');

	useEffect(() => {
		status.reset()();
		status.setCode(200)();
		// eslint-disable-next-line
	}, []);

	const checkForm = user => {
		for (let key in user) {
			if (!user[key]) return false;
		}
		return true;
	};

	const submitForm = e => {
		e.preventDefault();
		const user = { email, username, password };
		if (checkForm(user)) {
			API.User
				.register(user)
				.then(response => {
					console.log(response.data);
					if (response.data.status === 200) {
						status.setCode(200)();
						status.setSuccess(
							"You've been successfully logged in."
						)();
						currentUser.login(
							response.data.user,
							response.data.user.authToken
						)();
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
			{status.state.code !== 200 &&
			status.state.code !== 400 && <p>{status.state.error}</p>}

			{status.state.code === 400 && (
				<p>
					There was a problem logging in. Please go to the{' '}
					<Link to="/login">login page</Link> and try again.
				</p>
			)}

			<form>
				<InputGroup
					name="email"
					label="E-Mail"
					type="text"
					placeholder="raduser420@hotmail.net"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
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

				<Button value="Register" onClick={submitForm} />
			</form>
		</div>
	);
};

export default RegisterForm;
