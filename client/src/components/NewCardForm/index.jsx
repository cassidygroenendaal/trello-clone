// ----------------- Dependencies ------------------

import React, { useState, useRef, useEffect } from 'react';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroupRef from '../InputGroupRef';
import Button from '../Button';
// import API from '../../lib/API';

// ----------------- NewCardForm ------------------

const NewCardForm = props => {
	const [ cardTitle, setCardTitle ] = useState(''),
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

	const addCard = () => {
		const newCard = {
			BoardId  : props.boardId,
			ListId: props.listId,
			position : props.cardsLength,
			title    : cardTitle
		};

		props.onAddCard(newCard);
		setCardTitle('');
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
			<button className={styles.addCard} onClick={toggleForm}>
				+ Add a{props.cardsLength === 0 ? '' : 'nother'} card
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
					name={`new-card-title-${props.listId}`}
					value={cardTitle}
					ref={input}
					placeholder="Enter a title for this card..."
					onChange={e => setCardTitle(e.target.value)}
				/>
				<div
					className={isOpen ? styles.btnGroup : styles.btnGroupHide}
				>
					<Button onClick={addCard} value="Add Card" />
					<button className={styles.closeBtn} onClick={toggleForm}>
						X
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewCardForm;
