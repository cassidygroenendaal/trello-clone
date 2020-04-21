// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Other Dependencies ------------------

// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import LoginForm from '../../components/LoginForm';

// ----------------- Login Page ------------------

const Login = props => {
	return (
		<div className={styles.page}>
			<h1 className={styles.brand}>Trello Clone</h1>
			<LoginForm {...props} />
		</div>
	);
};

export default Login;
