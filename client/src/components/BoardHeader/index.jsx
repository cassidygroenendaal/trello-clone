// ----------------- Dependencies ------------------

import React, { useState, useEffect, useContext } from 'react';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';

// ----------------- Board Page ------------------

const BoardHeader = props => {
	return (
		<div className={styles.container}>
			<InputGroup
				label="Title"
				type="text"
				name="title"
				value={props.board.title}
				onChange={e =>
					props.updateBoard({
						...props.board,
						title : e.target.value
					})}
			/>
			<button
				onClick={e =>
					props.updateBoard({
						...props.board,
						isStarred : !props.board.isStarred
					})}
			>*</button>
		</div>
	);
};

export default BoardHeader;
