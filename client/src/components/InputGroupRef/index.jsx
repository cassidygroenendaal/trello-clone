// ----------------- Dependencies ------------------

import React, { forwardRef } from 'react';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- InputGroupRef ------------------

const InputGroupRef = forwardRef((props, ref) => {
	return (
		<div>
			{props.type !== 'radio' && (
				<label
					className={props.labelClass || styles.hidden}
					htmlFor={props.id || props.name}
					style={props.labelStyle}
				>
					{props.label}
				</label>
			)}
			<input
				className={props.inputClass || styles.input}
				type={props.type}
				id={props.id || props.name}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				checked={props.checked}
				onChange={props.onChange}
				ref={ref}
			/>

			{props.type === 'radio' && (
				<label
					className={props.labelClass || styles.hidden}
					htmlFor={props.id || props.name}
					style={props.labelStyle}
				>
					{props.label}
				</label>
			)}
		</div>
	);
});

export default InputGroupRef;
