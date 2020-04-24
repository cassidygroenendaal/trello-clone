// ----------------- Dependencies ------------------

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';

// import { useScrollPosition } from '../../hooks/useScrollPosition';

import useDebounce from '../../hooks/useDebounce';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

// import InputGroup from '../../components/InputGroup';
import Navbar from '../../components/Navbar';
import BoardHeader from '../../components/BoardHeader';

// ----------------- Board Page ------------------

const Board = props => {
	const currentUser = useContext(CurrentUserContext);
	let { id } = useParams();

	const [ board, setBoard ] = useState({}),
		[ isLoading, setIsLoading ] = useState(true);

	const debouncedBoard = useDebounce(board, 500);

	useEffect(
		() => {
			if (debouncedBoard.title) {
				API.Board
					.updateOne(currentUser.getToken()(), id, debouncedBoard)
					.then(res => {})
					.catch(err => console.log(err));
			} else {
				API.Board
					.getOne(currentUser.getToken()(), id)
					.then(res => {
						setBoard(res.data.board);
						setIsLoading(false);
					})
					.catch(err => console.log(err));
			}
		},
		[ debouncedBoard, currentUser, id ]
	);

	return (
		<div className={styles.page}>
			{isLoading ? (
				<div>Getting board....</div>
			) : (
				<div>
					{board.background[0] === '#' ? (
						<div
							className={styles.colorBG}
							style={{ backgroundColor: board.background }}
						/>
					) : (
						<img
							className={styles.imageBG}
							alt="background"
							src={board.background}
						/>
					)}

					<Navbar background="none" />
					<BoardHeader board={board} updateBoard={setBoard} />
				</div>
			)}
		</div>
	);
};

export default Board;
