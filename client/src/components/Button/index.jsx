// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Button ------------------

const Button = props => {
	return (
		<button
			className={
				props.className || props.disabled ? (
					styles.disabled
				) : (
					styles.btn
				)
			}
			disabled={props.disabled || false}
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
};

export default Button;
