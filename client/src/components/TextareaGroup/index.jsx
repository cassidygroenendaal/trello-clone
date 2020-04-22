// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- InputGroup ------------------

const TextareaGroup = props => {
	return (
		<div>
			<label className={props.labelClass} htmlFor={props.name}>
				{props.label}
			</label>
			<textarea
				className={props.inputClass}
				id={props.name}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
};

export default TextareaGroup;
