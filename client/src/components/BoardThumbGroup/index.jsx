// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { StatusContext } from '../../contexts/StatusContext';
// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import BoardThumb from '../BoardThumb';
import CreateBoardModal from '../CreateBoardModal';
import ThumbButton from '../ThumbButton';

// ----------------- EditUserForm ------------------

const BoardThumbGroup = props => {
	return (
		<div className={styles.container}>
			<h1>{props.title}</h1>
			<div className={styles.row}>
				{props.boards.map(board => (
					<div key={board.id} className={styles.col4}>
						<BoardThumb
							board={board}
							starBoard={e => props.starBoard(e, board.id)}
						/>
					</div>
				))}
				{props.includeCreate ? (
					<CreateBoardModal className={styles.col4}>
						<ThumbButton />
					</CreateBoardModal>
				) : null}
			</div>
		</div>
	);
};

export default BoardThumbGroup;
