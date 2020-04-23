// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

// ----------------- EditUserForm ------------------

const ThumbButton = props => {
	return (
		<div className={styles.btn}>
			<p className={styles.content}>Create new board</p>
		</div>
	);
};

export default ThumbButton;
