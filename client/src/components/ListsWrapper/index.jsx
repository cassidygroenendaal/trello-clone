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
		[ draggedListId, setDraggedListId ] = useState(null),
		[ listToUpdate, setListToUpdate ] = useState({}),
		[ listsToUpdate, setListsToUpdate ] = useState([]),
		[ isLoading, setIsLoading ] = useState(true);

	const debouncedList = useDebounce(listToUpdate, 500);
	const debouncedLists = useDebounce(listsToUpdate, 500);

	useEffect(
		() => {
			if (
				props.listIdToUnarchive &&
				allLists.find(list => list.id === props.listIdToUnarchive)
					.isArchived
			) {
				console.log('Unarchiving list...');
				updateLists(props.listIdToUnarchive, { isArchived: false });
			} else if (debouncedLists.length > 0) {
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
				console.log('LISTS: INITIAL GET');
				API.List
					.getAllInBoard(currentUser.getToken()(), props.boardId)
					.then(res => {
						// console.log(res.data.lists);
						setAllLists(res.data.lists);
						filterAndSortLists(res.data.lists);
						setIsLoading(false);
					})
					.catch(err => console.log(err));
			}
		},
		// eslint-disable-next-line
		[
			debouncedList,
			debouncedLists,
			currentUser,
			props.boardId,
			props.listIdToUnarchive
		]
	);

	const filterAndSortLists = listsArray => {
		const listsCopy = listsArray.sort(
			(a, b) => a.position - b.position
		);

		const goodLists = listsCopy.filter(list => !list.isArchived);

		const badLists = listsCopy.filter(list => list.isArchived);

		setLists(goodLists);
		setArchivedLists(badLists);
		props.sendArchive(badLists);
	};

	const updateLists = (listId, info) => {
		// Create a copy of allLists so we can freely edit them
		let listsCopy = [ ...allLists ];

		// Grab the index of the list we want to edit
		const foundIndex = listsCopy.findIndex(
			list => list.id === listId
		);

		// If we are archiving/un-archiving a list,
		// positions will need to be updated as well
		if (info.hasOwnProperty('isArchived')) {
			if (info.isArchived) {
				// If isArchived is being set to true,
				// all other lists must be repositioned
				listsCopy[foundIndex] = {
					...listsCopy[foundIndex],
					...info,
					position : -1
				};

				// Update list positions
				const updatedLists = updateListPositions(listsCopy);
				setAllLists(updatedLists.repositionedLists);
				filterAndSortLists(updatedLists.repositionedLists);

				// Set setListsToUpdate with the array of repositioned lists
				// and with the list that had it's isArchived property modified
				// This is necessary because archived lists will not be repositioned
				setListsToUpdate([
					listsCopy[foundIndex],
					...updatedLists.changedLists
				]);
			} else {
				console.log('ARCHIVE === FALSE');

				// If isArchived is being set to false,
				// only the current list must be repositioned
				listsCopy[foundIndex] = {
					...listsCopy[foundIndex],
					...info,
					position : lists.length
				};

				// We are updating only 1 list,
				// so we can update the single list like normal
				const temp = listsCopy[foundIndex];
				setAllLists(listsCopy);
				console.log(listsCopy[foundIndex]);
				filterAndSortLists(listsCopy);
				setListToUpdate(temp);
			}
		} else if (info.hasOwnProperty('position')) {
			console.log('Updating position...');
			listsCopy[foundIndex] = { ...listsCopy[foundIndex], ...info };

			// Update list positions
			const updatedLists = updateListPositions(listsCopy);
			setAllLists(updatedLists.repositionedLists);
			filterAndSortLists(updatedLists.repositionedLists);
			setListsToUpdate(updatedLists.changedLists);
		} else {
			// If we are updating any other property,
			// we can update the single list like normal
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
			if (list.position !== i) {
				list.position = i;
				changedLists.push(list);
			}
			repositionedLists.push(list);
		});

		console.log('Changed Lists:', changedLists);
		console.log('Repositioned Lists:', repositionedLists);

		return { repositionedLists, changedLists };
	};

	const handleDragStart = (e, listId) => {
		setDraggedListId(listId);
	};

	const handleDragOver = (e, listId, mouseX) => {
		e.preventDefault();
		if (listId === draggedListId) return;
		// console.log('dragging over List!');

		// Make a copy of the lists array so we can edit it
		const listsCopy = [ ...lists ];

		// Get the index of the list we are dragging
		const draggedListIndex = listsCopy.findIndex(
			list => list.id === draggedListId
		);

		// Remove the list from the array and set it in draggedList
		const draggedList = listsCopy.splice(draggedListIndex, 1);
		// const draggedList = listsCopy[draggedListIndex];

		// Get the index of the list we just dragged over
		const draggedOverListIndex = listsCopy.findIndex(
			list => list.id === listId
		);

		if (mouseX <= 138) {
			// Place draggedList 1 index BEFORE the draggedOverList
			listsCopy.splice(draggedOverListIndex, 0, ...draggedList);
		} else {
			// Place draggedList 1 index AFTER the draggedOverList;
			listsCopy.splice(draggedOverListIndex + 1, 0, ...draggedList);
		}

		setLists(listsCopy);
	};

	const handleDrop = e => {
		// console.log('dropped!');

		// Make a copy of the allLists array by combining
		// archivedLists and lists so we can edit it
		const allListsCopy = [ ...archivedLists, ...lists ];

		const updatedLists = updateListPositions(allListsCopy);
		setAllLists(updatedLists.repositionedLists);
		filterAndSortLists(updatedLists.repositionedLists);
		setListsToUpdate(updatedLists.changedLists);
	};

	return (
		<div className={styles.container}>
			<div className={styles.inner} onDrop={handleDrop}>
				{!isLoading &&
					lists.map(list => (
						<List
							key={`list-${list.id}`}
							list={list}
							boardId={props.boardId}
							updateLists={updateLists}
							onDragStart={handleDragStart}
							onDragOver={handleDragOver}
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
