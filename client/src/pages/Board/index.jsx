// ----------------- Dependencies ------------------

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import useDebounce from '../../hooks/useDebounce';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import Navbar from '../../components/Navbar';
import BoardHeader from '../../components/BoardHeader';
import InputGroup from '../../components/InputGroup';
import TextareaGroup from '../../components/TextareaGroup';

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

	const listColorOpts = [
		'#0079bf',
		'#d29034',
		'#519839',
		'#b04632',
		'#89609e',
		'#cd5a91',
		'#4bbf6b',
		'#00aecc',
		'#838c91'
	];

	const sideMenu = {
		title : 'Menu',
		main  : [
			{
				title     : 'About This Board',
				component : (
					<div>
						{isLoading ? (
							<div>Getting board....</div>
						) : (
							<div>
								<div>
									<h3 className={styles.title}>Made By</h3>
									<div className={styles.row}>
										{board.User.avatar ? (
											<img src={board.User.avatar} alt="profile" />
										) : (
											<div>
												<p>{board.User.initials}</p>
											</div>
										)}
										<div>
											<p>{board.User.fullname}</p>
											<p>@{board.User.username}</p>
										</div>
									</div>

									{board.User.id === currentUser.state.id && (
										<Link to="/my-account">Edit Profile Info</Link>
									)}
								</div>
								<div>
									<h3 className={styles.title}>Description</h3>
									<TextareaGroup
										inputClass={
											board.description ? (
												styles.textareaFull
											) : (
												styles.textareaEmpty
											)
										}
										placeholder="It's your board's time to shine! Let people know what this board is used for and what they can expect to see."
										value={board.description || ''}
										onChange={e =>
											setBoard({
												...board,
												description : e.target.value || null
											})}
									/>
								</div>
							</div>
						)}
					</div>
				)
			},
			{
				title     : 'Change Background',
				component : (
					<div className={styles.radioGroup}>
						{isLoading ? (
							<div>Getting info....</div>
						) : (
							listColorOpts.map(color => {
								return (
									<InputGroup
										key={color}
										id={color}
										labelClass={styles.radioLabel}
										labelStyle={{ backgroundColor: color }}
										inputClass={styles.radioInput}
										type="radio"
										name="background"
										value={color}
										checked={board.background === color}
										onChange={e =>
											setBoard({
												...board,
												background : e.target.value
											})}
									/>
								);
							})
						)}
					</div>
				)
			},
			{
				title     : 'Settings',
				component : (
					<div>
						<button>Hi, I'm the Settings component!</button>
					</div>
				)
			},
			{
				title     : 'Labels',
				component : (
					<div>
						<button>Hi, I'm the Labels component!</button>
					</div>
				)
			}
		]
	};

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

					<Navbar background="#00000027" />
					<BoardHeader
						board={board}
						updateBoard={setBoard}
						sideMenu={sideMenu}
					/>
				</div>
			)}
		</div>
	);
};

export default Board;
