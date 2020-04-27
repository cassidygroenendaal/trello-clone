// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';

// ----------------- List ------------------

const List = props => {
	return (
		<div className={styles.container}>
			<InputGroup
				inputClass={styles.input}
				label="Title"
				type="text"
				name="title"
				id={`list-${props.list.title}-${props.list.id}`}
				value={props.list.title}
				onChange={e => {
					props.updateLists(props.list.id, {
						[e.target.name]: e.target.value
					});
				}}
			/>
			<button className={styles.addCard}>+ Add a card</button>
		</div>
	);
};

export default List;
