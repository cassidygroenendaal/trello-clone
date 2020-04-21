// ----------------- Dependencies ------------------

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { StatusContext } from '../../contexts/StatusContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';

// ----------------- ForgotForm ------------------

const ForgotForm = () => {
	const status = useContext(StatusContext);

	const [ email, setEmail ] = useState(''),
		[ mailSent, setMailSent ] = useState(false);

	const submitForm = e => {
		e.preventDefault();
		if (email === '') {
			status.setError('Email cannot be blank.')();
			status.setCode(400)();
		} else {
			API.User
				.forgot(email)
				.then(response => {
					if (response.data.status === 200) {
						status.setCode(200)();
						status.setSuccess(
							'Password Reset Email successfully sent!'
						)();
						setMailSent(true);
					} else {
						setMailSent(false);
						status.setError(response.data.message)();
						status.setCode(response.data.status)();
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

			{!mailSent && (
				<form>
					<p className={styles.heading}>Can't Log in?</p>
					<p className={styles.subheading}>We'll send a recovery link to</p>
					<InputGroup
						labelClass={styles.hiddenLabel}
						inputClass={styles.input}
						name="email"
						label="Email"
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Button
						className={styles.btn}
						value="Send recovery link"
						onClick={submitForm}
					/>
				</form>
			)}

			<hr className={styles.hr} />
			<Link className={styles.loginLink} to="/login">
				Return to log in
			</Link>

			{mailSent && (
				<div>
					<h3>{status.state.success}</h3>
				</div>
			)}
		</div>
	);
};

export default ForgotForm;
