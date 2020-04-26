// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
import SideMenu from '../SideMenu';

// ----------------- Board Page ------------------

const BoardHeader = props => {

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<InputGroup
					label="Title"
					inputClass={styles.input}
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
					className={
						props.board.isStarred ? styles.starred : styles.btnSquare
					}
					onClick={e =>
						props.updateBoard({
							...props.board,
							isStarred : !props.board.isStarred
						})}
				>
					O
				</button>
			</div>
			<div className={styles.flex}>
				<SideMenu btnClass={styles.btn} menu={props.sideMenu} side="right">
					Show Menu
				</SideMenu>
			</div>
		</div>
	);
};

export default BoardHeader;
