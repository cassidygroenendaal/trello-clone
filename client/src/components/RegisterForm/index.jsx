// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { StatusContext } from '../../contexts/StatusContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
// import InputGroupPassword from '../../components/InputGroupPassword';
import Button from '../../components/Button';

// ----------------- RegisterForm ------------------

const RegisterForm = props => {
	const status = useContext(StatusContext),
		currentUser = useContext(CurrentUserContext);

	const location = useLocation();

	const [ fullname, setFullname ] = useState(''),
		[ email, setEmail ] = useState(
			location.state && location.state.email
				? location.state.email
				: ''
		),
		[ password, setPassword ] = useState(''),
		[ isDisabled, setIsDisabled ] = useState(true);

	useEffect(
		() => {
			const user = { email, fullname, password };

			if (checkForm(user)) {
				setIsDisabled(false);
			} else {
				setIsDisabled(true);
			}

			status.reset()();
			status.setCode(200)();
		},
		// eslint-disable-next-line
		[ email, fullname, password ]
	);

	const checkForm = user => {
		for (let key in user) {
			if (!user[key]) return false;
		}
		return true;
	};

	const handleChange = e => {
		const { name, value } = e.target;

		if (name === 'email') {
			setEmail(value);
		} else if (name === 'fullname') {
			setFullname(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};

	const submitForm = e => {
		e.preventDefault();
		const user = { email, fullname, password };
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
						props.history.push('/b');
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
			{status.state.code !== 200 &&
			status.state.code !== 400 && <p>{status.state.error}</p>}

			{status.state.code === 400 && (
				<p>
					There was a problem logging in. Please go to the{' '}
					<Link to="/login">login page</Link> and try again.
				</p>
			)}

			<form>
				<p className={styles.heading}>Sign up for your account</p>
				<InputGroup
					name="email"
					label="E-Mail"
					type="text"
					placeholder="Enter email"
					value={email}
					onChange={handleChange}
				/>
				<InputGroup
					name="fullname"
					label="Fullname"
					type="text"
					placeholder="Enter full name"
					value={fullname}
					onChange={handleChange}
				/>
				<InputGroup
					name="password"
					label="Password"
					type="password"
					placeholder="Create password"
					value={password}
					onChange={handleChange}
				/>
				<p className={styles.terms}>
					By signing up, you confirm that you've read and accepted our{' '}
					<Link className={styles.link} to="/404">
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link className={styles.link} to="/404">
						Privacy Policy
					</Link>.
				</p>
				<Button
					disabled={isDisabled}
					value="Sign Up"
					onClick={submitForm}
				/>
			</form>
			<hr className={styles.hr} />
			<Link className={styles.loginLink} to="/login">
				Already have an account? Log In
			</Link>
		</div>
	);
};

export default RegisterForm;
