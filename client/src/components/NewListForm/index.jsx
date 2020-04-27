// ----------------- Dependencies ------------------

import React, { useState, useRef, useEffect } from 'react';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroupRef from '../InputGroupRef';
import Button from '../Button';
// import API from '../../lib/API';

// ----------------- List ------------------

const List = props => {
	const [ listTitle, setListTitle ] = useState(''),
		[ isOpen, setIsOpen ] = useState(false),
		[ isVisible, setIsVisible ] = useState(false);

	const panel = useRef(null),
		input = useRef(null);

	useEffect(
		() => {
			input.current.focus();
		},
		[ isVisible ]
	);

	const addList = () => {
		const newList = {
			BoardId  : props.boardId,
			position : props.listsLength + 1,
			title    : listTitle
		};

		props.onAddList(newList);
		setListTitle('');
		toggleForm();
	};

	const toggleForm = () => {
		if (isOpen) {
			setIsOpen(false);
			panel.current.style.maxHeight = null;
			setTimeout(() => setIsVisible(false), 211);
		} else {
			setIsOpen(true);
			panel.current.style.maxHeight = `${panel.current
				.scrollHeight}px`;
			setIsVisible(true);
		}
	};

	return (
		<div className={styles.wrapper}>
			<button className={styles.addList} onClick={toggleForm}>
				+ Add a{props.listsLength === 0 ? '' : 'nother'} list
			</button>
			<div
				className={isOpen ? styles.container : styles.hide}
				style={{ visibility: isVisible ? 'visible' : 'hidden' }}
				ref={panel}
			>
				<InputGroupRef
					inputClass={styles.input}
					label="Title"
					type="text"
					name="new-list-title"
					value={listTitle}
					ref={input}
					onChange={e => setListTitle(e.target.value)}
				/>
				<div
					className={isOpen ? styles.btnGroup : styles.btnGroupHide}
				>
					<Button onClick={addList} value="Add List" />
					<button className={styles.closeBtn} onClick={toggleForm}>
						X
					</button>
				</div>
			</div>
		</div>
	);
};

export default List;
