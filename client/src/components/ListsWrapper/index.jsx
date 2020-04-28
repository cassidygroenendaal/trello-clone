// ----------------- Dependencies ------------------

import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';

import useDebounce from '../../hooks/useDebounce';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import List from '../List';
import NewListForm from '../NewListForm';

// ----------------- ListsWrapper ------------------

const ListsWrapper = props => {
	const currentUser = useContext(CurrentUserContext);

	const [ allLists, setAllLists ] = useState([]),
		[ lists, setLists ] = useState([]),
		[ archivedLists, setArchivedLists ] = useState([]),
		[ draggedList, setDraggedList ] = useState({}),
		[ listToUpdate, setListToUpdate ] = useState({}),
		[ listsToUpdate, setListsToUpdate ] = useState([]),
		[ isLoading, setIsLoading ] = useState(true);

	const debouncedList = useDebounce(listToUpdate, 1000);
	const debouncedLists = useDebounce(listsToUpdate, 500);

	useEffect(
		() => {
			if (debouncedLists.length > 0) {
				console.log('Updating many!', debouncedLists);
				API.List
					.updateMany(currentUser.getToken()(), debouncedLists)
					.catch(err => console.log(err));
			} else if (debouncedList.title) {
				console.log('Updating one!', debouncedList);
				API.List
					.updateOne(
						currentUser.getToken()(),
						debouncedList.id,
						debouncedList
					)
					.catch(err => console.log(err));
			} else {
				console.log('Initial GET');
				API.List
					.getAllInBoard(currentUser.getToken()(), props.boardId)
					.then(res => {
						console.log(res.data.lists);
						setAllLists(res.data.lists);
						filterAndSortLists(res.data.lists);
						setIsLoading(false);
					})
					.catch(err => console.log(err));
			}
		},
		[ debouncedList, debouncedLists, currentUser, props.boardId ]
	);

	const filterAndSortLists = listArray => {
		const listCopy = listArray.sort(
			(a, b) => a.position - b.position
		);

		const goodLists = listCopy.filter(
			list => list.isArchived === false
		);

		const badLists = listCopy.filter(
			list => list.isArchived === true
		);

		setLists(goodLists);
		setArchivedLists(badLists);
	};

	const updateLists = (listId, info) => {
		let listsCopy = [ ...allLists ];

		const foundIndex = listsCopy.findIndex(
			list => list.id === listId
		);

		console.log(listsCopy[foundIndex]);

		if (info.hasOwnProperty('isArchived')) {
			console.log("Has property 'isArchived'");

			listsCopy[foundIndex] = {
				...listsCopy[foundIndex],
				...info,
				position : -1
			};

			console.log(listsCopy[foundIndex]);
			setListToUpdate(listsCopy[foundIndex]);

			const updatedLists = updateListPositions(listsCopy);
			setAllLists(updatedLists.repositionedLists);
			filterAndSortLists(updatedLists.repositionedLists);
			setListsToUpdate(updatedLists.changedLists);
		} else {
			console.log("Does not have property 'isArchived'");

			listsCopy[foundIndex] = { ...listsCopy[foundIndex], ...info };
			setAllLists(listsCopy);
			filterAndSortLists(listsCopy);
			setListToUpdate(listsCopy[foundIndex]);
		}
	};

	const addList = newList => {
		API.List
			.createOne(currentUser.getToken()(), newList)
			.then(res => {
				setAllLists([ ...allLists, res.data.list ]);
				filterAndSortLists([ ...allLists, res.data.list ]);
			})
			.catch(err => console.log(err));
	};

	const updateListPositions = listArray => {
		const listsCopyGood = listArray.filter(
				list => list.isArchived === false
			),
			listsCopyArchived = listArray.filter(
				list => list.isArchived === true
			);

		// changedLists will be sent to the database to be updated
		const changedLists = [],
			// repositionedLists will be sorted, filtered, and saved to state
			repositionedLists = [ ...listsCopyArchived ];

		// loop through array of !isArchived lists
		listsCopyGood.forEach((list, i) => {
			// Only update the position if the position is wrong
			if (list.position !== -1 && list.position !== i) {
				list.position = i;
				changedLists.push(list);
			}
			repositionedLists.push(list);
		});

		console.log('Changed Lists:', changedLists);
		console.log('Repositioned Lists:', repositionedLists);

		return { repositionedLists, changedLists };
	};

	const handleDragOver = e => {
		e.preventDefault();
	};

	const handleDragStart = (e, listId) => {
		console.log('Drag start!');
		// Make a copy of the allLists array so we can edit it
		const allListsCopy = [ ...allLists ];
		// console.log(allListsCopy);

		// Get the index of the list we are dragging
		const draggedListIndex = allListsCopy.findIndex(
			list => list.id === listId
		);

		// Remove the list from the array and set it in draggedList
		const listCopy = allListsCopy.splice(draggedListIndex, 1);
		// console.log(allListsCopy);
		setAllLists(allListsCopy);
		setDraggedList(...listCopy);
	};

	const handleDrop = e => {
		console.log('dropped!');

		// Make a copy of the allLists array so we can edit it
		const allListsCopy = [ ...allLists ];

		// For now, insert draggedList onto the end of the array
		allListsCopy.splice(allListsCopy.length, 0, draggedList);
		// Later, inset draggedList wherever the user dropped it
		// allListsCopy.splice(VARIABLE_INDEX, 0, draggedList);

		const updatedLists = updateListPositions(allListsCopy);
		setAllLists(updatedLists.repositionedLists);
		filterAndSortLists(updatedLists.repositionedLists);
		setListsToUpdate(updatedLists.changedLists);

		setDraggedList({});
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.inner}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				{!isLoading &&
					lists.map(list => (
						<List
							key={`list-${list.id}`}
							list={list}
							updateLists={updateLists}
							onDragStart={handleDragStart}
						/>
					))}
			</div>
			<NewListForm
				boardId={props.boardId}
				listsLength={lists.length}
				onAddList={addList}
			/>
		</div>
	);
};

export default ListsWrapper;
