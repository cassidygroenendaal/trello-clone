// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- InputGroup ------------------

const TextareaGroup = props => {
	return (
		<div>
			<label
				className={props.labelClass || styles.hidden}
				htmlFor={props.name}
			>
				{props.label}
			</label>
			<textarea
				className={props.inputClass || styles.textarea}
				id={props.name}
				name={props.name}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
};

export default TextareaGroup;
