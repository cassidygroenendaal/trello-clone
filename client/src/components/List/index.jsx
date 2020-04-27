// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../InputGroup';
import FunctionMenu from '../FunctionMenu';

// ----------------- List ------------------

const List = props => {
	const archiveList = () => {
		props.updateLists(props.list.id, { isArchived: true });
	};

	const listMenuOpts = [
		{
			name : 'Archive This List',
			type : 'button',
			func : archiveList
		}
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
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
				<FunctionMenu
					btnClass={styles.btnMenu}
					title="List Actions"
					items={listMenuOpts}
				>
					...
				</FunctionMenu>
			</div>
			<button className={styles.addCard}>+ Add a card</button>
		</div>
	);
};

export default List;
