// ----------------- Dependencies ------------------

import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';

// import { useScrollPosition } from '../../hooks/useScrollPosition';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

// import InputGroup from '../../components/InputGroup';
import Navbar from '../../components/Navbar';
import BoardThumbGroup from '../../components/BoardThumbGroup';

// ----------------- Landing Page ------------------

const Boards = props => {
	const currentUser = useContext(CurrentUserContext);

	const [ boards, setBoards ] = useState([]);

	useEffect(
		() => {
			getBoards();
		},
		// eslint-disable-next-line
		[ currentUser ]
	);

	const getBoards = () => {
		API.Board
			.getMy(currentUser.getToken()())
			.then(res => {
				setBoards(res.data.boards);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleStar = (e, id) => {
		e.preventDefault();
		const board = boards.find(item => item.id === id);
		board.isStarred = !board.isStarred;
		API.Board
			.updateOne(currentUser.getToken()(), id, board)
			.then(res => {
				getBoards();
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div>
			<Navbar />
			<div className={styles.container}>
				<aside className={styles.aside}>Side nav here</aside>
				<main className={styles.main}>
					{boards.length > 0 ? (
						<div>
							<BoardThumbGroup
								title="Starred Boards"
								boards={boards.filter(({ isStarred }) => isStarred)}
								starBoard={handleStar}
							/>
							<BoardThumbGroup
								title="Personal Boards"
								// boards={boards.filter(({ starred }) => starred)} <== where TeamId === null
								boards={boards}
								starBoard={handleStar}
								includeCreate={true}
								afterCreate={getBoards}
							/>
						</div>
					) : null}
				</main>
			</div>
		</div>
	);
};

export default Boards;
