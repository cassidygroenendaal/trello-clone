// ----------------- Dependencies ------------------

import React, { useState } from 'react';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import Dropdown from '../Dropdown';

// ----------------- Button ------------------

const AssignedCards = props => {
	const [ sortedBy, setSortedBy ] = useState('board'),
		[ filteredBy, setFilteredBy ] = useState('all boards');

	const sortCards = value => {
		setSortedBy(value);
	};

	const filterCards = value => {
		setFilteredBy(value);
	};

	const listSortOpts = [
		{
			name       : 'Sort by board',
			value      : 'board',
			isSelected : true
		},
		{
			name       : 'Sort by due date',
			value      : 'due date',
			isSelected : false
		}
	];

	const listFilterOpts = [
		{
			name       : 'All boards',
			value      : 'all boards',
			isSelected : true
		}
	];

	return (
		<div className={styles.container}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Dropdown
						value={sortedBy}
						title="Sort Cards"
						items={listSortOpts}
						type="select"
						onClick={sortCards}
					/>
				</li>
				<li className={styles.item}>
					<Dropdown
						value={filteredBy}
						title="Filter Cards"
						items={listFilterOpts}
						type="select"
						onClick={filterCards}
					/>
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
