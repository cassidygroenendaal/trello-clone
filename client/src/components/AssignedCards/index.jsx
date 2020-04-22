// ----------------- Dependencies ------------------

import React, { useState } from 'react';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import Button from '../Button';

// ----------------- Button ------------------

const AssignedCards = props => {
	const [ sortedBy, setSortedBy ] = useState('board'),
		[ filteredBy, setFilteredBy ] = useState('all boards');

	return (
		<div className={styles.container}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<button className={styles.btn}>
						Sorting by <span className={styles.bold}>{sortedBy}</span>
					</button>
				</li>
				<li className={styles.item}>
					<button className={styles.btn}>
						Showing cards from{' '}
						<span className={styles.bold}>{filteredBy}</span>
					</button>
				</li>
			</ul>
			<div className={styles.cards}>
				<p>
					No visible cards. You must be added to a card for it to
					appear here.
				</p>
			</div>
		</div>
	);
};

export default AssignedCards;
