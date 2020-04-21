// ----------------- Dependencies ------------------

import React from 'react';
// import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import RegisterForm from '../../components/RegisterForm';

// ----------------- Register Page ------------------

const Register = props => {
	return (
		<div className={styles.page}>
			<h1 className={styles.brand}>Trello Clone</h1>
			<RegisterForm {...props} />
		</div>
	);
};

export default Register;
