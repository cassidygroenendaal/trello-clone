// ----------------- Dependencies ------------------

import React, { useState, useEffect } from 'react';

import useDebounce from '../../hooks/useDebounce';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../InputGroup';

// ----------------- ArchivedItems ------------------

const ArchivedItems = props => {
	const [
			filteredArchivedLists,
			setFilteredArchivedLists
		] = useState([]),
		[
			archivedListsSearchTerm,
			setArchivedListsSearchTerm
		] = useState('');

	const debouncedArchivedListsSearchTerm = useDebounce(
		archivedListsSearchTerm,
		500
	);

	useEffect(
		() => {
			if (debouncedArchivedListsSearchTerm) {
				const filteredLists = props.archivedLists.filter(list =>
					list.title
						.toLowerCase()
						.includes(debouncedArchivedListsSearchTerm.toLowerCase())
				);
				setFilteredArchivedLists(filteredLists);
			} else {
				setFilteredArchivedLists(props.archivedLists);
			}
		},
		[ debouncedArchivedListsSearchTerm, props.archivedLists ]
	);

	return (
		<div>
			<InputGroup
				type="text"
				name="archivedListsSearchTerm"
				value={archivedListsSearchTerm}
				onChange={e => setArchivedListsSearchTerm(e.target.value)}
			/>
			<ul className={styles.archivedList}>
				{filteredArchivedLists.length > 0 &&
					filteredArchivedLists.map(list => (
						<li
							key={`archived-list-${list.id}`}
							className={styles.archivedItem}
						>
							<p className={styles.archivedText}>{list.title}</p>
							<button className={styles.archivedBtn}>
								Send to Board
							</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default ArchivedItems;
