// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Other Dependencies ------------------

// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import ResetForm from '../../components/ResetForm';

// ----------------- Reset Page ------------------

const Reset = props => {
	return (
		<div className={styles.page}>
			<h1 className={styles.brand}>Trello Clone</h1>
			<ResetForm {...props} />
		</div>
	);
};

export default Reset;
