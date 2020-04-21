// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import ForgotForm from '../../components/ForgotForm';

// ----------------- Forgot Page ------------------

const Forgot = props => {
	return (
		<div className={styles.page}>
			<h1 className={styles.brand}>Trello Clone</h1>
			<ForgotForm />
		</div>
	);
};

export default Forgot;
