// ----------------- Dependencies ------------------

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

// ----------------- EditUserForm ------------------

const BoardThumb = props => {
	return (
		<Link to={`/b/${props.board.id}`} className={styles.container}>
			{props.board.background[0] === '#' ? (
				<div
					className={styles.colorBG}
					style={{ backgroundColor: props.board.background }}
				/>
			) : (
				<img
					className={styles.imageBG}
					src={props.board.background}
					alt="background"
				/>
			)}
			<div className={styles.content}>
				<h2 className={styles.title}>{props.board.title}</h2>
				<button onClick={props.starBoard}
					className={
						props.board.isStarred ? styles.isStarred : styles.star
					}
				>
					*
				</button>
			</div>
		</Link>
	);
};

export default BoardThumb;
