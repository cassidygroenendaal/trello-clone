// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { StatusContext } from '../../contexts/StatusContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
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
						setTimeout(() => {
							currentUser.login(
								res.data.user,
								res.data.user.authToken
							)();
							props.history.push('/');
						}, 3000);
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
		<div className={styles.formGroup}>
			{status.state.code !== undefined &&
			status.state.code !== 200 && (
				<div>
					<p className={styles.error}>{status.state.error}</p>
					<Link className={styles.link} to="/forgot">
						Send a new link
					</Link>
				</div>
			)}

			{status.state.success && <p>{status.state.success}</p>}

			{status.state.code === 200 && (
				<form>
					<InputGroup
						labelClass={styles.hiddenLabel}
						inputClass={styles.input}
						name="password"
						label="New Password"
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<Button
						className={styles.btn}
						value="Reset password"
						onClick={submitForm}
					/>
				</form>
			)}

			<hr className={styles.hr} />
			<Link className={styles.loginLink} to="/login">
				Return to log in
			</Link>
		</div>
	);
};

export default ResetForm;
