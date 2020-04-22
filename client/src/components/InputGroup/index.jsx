// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- InputGroup ------------------

const InputGroup = props => {
	return (
		<div>
			<label
				className={props.labelClass || styles.hidden}
				htmlFor={props.name}
			>
				{props.label}
			</label>
			<input
				className={props.inputClass || styles.input}
				type={props.type}
				id={props.name}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.onChange}
			/>
		</div>
	);
};

export default InputGroup;
