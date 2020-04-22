// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { StatusContext } from '../../contexts/StatusContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';

// ----------------- LoginForm ------------------

const LoginForm = props => {
	const currentUser = useContext(CurrentUserContext),
		status = useContext(StatusContext);

	const [ email, setEmail ] = useState(''),
		[ password, setPassword ] = useState('');

	useEffect(() => {
		status.reset()();
		status.setCode(200)();
		// eslint-disable-next-line
	}, []);

	const submitForm = e => {
		e.preventDefault();
		if (email !== '' && password !== '') {
			const user = { email, password };

			API.User
				.login(user)
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
		<div className={styles.formGroup}>
			{status.state.code !== 200 && (
				<div>
					<p>{status.state.error}</p>
				</div>
			)}

			<form>
				<p className={styles.heading}>Log in to Trello Clone</p>
				<InputGroup
					name="email"
					label="Email"
					type="text"
					placeholder="Enter email"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<InputGroup
					name="password"
					label="Password"
					type="password"
					placeholder="Enter password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<Button value="Login" onClick={submitForm} />
			</form>
			<hr className={styles.hr} />
			<Link className={styles.link} to="/forgot">
				Can't log in?
			</Link>
			{' - '}
			<Link className={styles.link} to="/register">
				Sign up for an account
			</Link>
		</div>
	);
};

export default LoginForm;
