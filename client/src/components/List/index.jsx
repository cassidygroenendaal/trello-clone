// ----------------- Dependencies ------------------

import React, { useState, useRef } from 'react';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../InputGroup';
import FunctionMenu from '../FunctionMenu';

// ----------------- List ------------------

const List = props => {
	const [ isDragging, setIsDragging ] = useState(false);

	const ref = useRef(null);

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

	const handleDragStart = e => {
		// console.log(ref.current);
		// console.log(e.target)
		setIsDragging(true);
		e.dataTransfer.setDragImage(e.target, 140, 20);
		props.onDragStart(e, props.list.id);
	};

	const handleDragEnd = () => {
		setIsDragging(false);
	};

	return (
		<div
			ref={ref}
			className={isDragging ? styles.isDragging : styles.container}
			draggable
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
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
