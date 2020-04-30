// ----------------- Dependencies ------------------

import React, { useState, useRef } from 'react';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../InputGroup';
import FunctionMenu from '../FunctionMenu';
import CardsWrapper from '../CardsWrapper';

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
		// console.log(ref);
		// console.log(ref.current);
		// console.log(e)
		// console.log(e.target)
		setIsDragging(true);
		e.dataTransfer.setDragImage(ref.current, 140, 20);
		props.onDragStart(e, props.list.id);
	};

	const handleDragOver = e => {
		let mouseX = e.clientX - e.target.offsetLeft;
		props.onDragOver(e, props.list.id, mouseX);
	};

	const handleDragEnd = () => {
		setIsDragging(false);
	};

	return (
		<div
			draggable
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragOver={handleDragOver}
		>
			<div
				ref={ref}
				className={isDragging ? styles.isDragging : styles.container}
			>
				<div className={isDragging ? styles.isDraggingInner : ''}>
					<div className={styles.handle}>
						<div className={styles.handleIcon} />
					</div>
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
					<CardsWrapper
						boardId={props.boardId}
						listId={props.list.id}
					/>
				</div>
			</div>
		</div>
	);
};

export default List;
