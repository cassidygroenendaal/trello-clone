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
		[ listToUpdate, setListToUpdate ] = useState({}),
		[ listsToUpdate, setListsToUpdate ] = useState([]),
		[ isLoading, setIsLoading ] = useState(true);

	const debouncedList = useDebounce(listToUpdate, 1000);

	useEffect(
		() => {
			if (listsToUpdate.length > 0) {
				console.log('Updating many!');
				API.List.updateMany(currentUser.getToken()(), listsToUpdate);
				setListsToUpdate([]);
			} else if (debouncedList.title) {
				console.log('Update firing!', debouncedList);
				API.List
					.updateOne(
						currentUser.getToken()(),
						debouncedList.id,
						debouncedList
					)
					.then(res => {})
					.catch(err => console.log(err));
			} else {
				console.log('Initial GET');
				API.List
					.getAllInBoard(currentUser.getToken()(), props.boardId)
					.then(res => {
						setAllLists(res.data.lists);
						filterAndSortLists(res.data.lists);
						setIsLoading(false);
					})
					.catch(err => console.log(err));
			}
		},
		[ debouncedList, listsToUpdate, currentUser, props.boardId ]
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

		if (info.hasOwnProperty('isArchived')) {
			listsCopy[foundIndex] = {
				...listsCopy[foundIndex],
				...info,
				position : -1
			};

			const updatedLists = updateListPositions(listsCopy);
			setAllLists(updatedLists);
			filterAndSortLists(updatedLists);
			setListsToUpdate(updatedLists);
		} else {
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
		const listsCopy = listArray.sort(
				(a, b) => a.position - b.position
			),
			listsCopyArchived = listsCopy.filter(
				list => list.isArchived === true
			);

		const changedLists = [],
			sortedLists = [];

		// loop through sorted array of !isArchived lists
		listsCopy.forEach((list, i) => {
			if (
				list.position !== -1 &&
				list.position !== i - listsCopyArchived.length
			) {
				list.position = i - listsCopyArchived.length;
				changedLists.push(list);
			}
			sortedLists.push(list);
		});

		console.log(changedLists);
		console.log(sortedLists);

		return sortedLists;
	};

	return (
		<div className={styles.container}>
			{!isLoading &&
				lists.map(list => (
					<List
						key={`list-${list.id}`}
						list={list}
						updateLists={updateLists}
					/>
				))}

			<NewListForm
				boardId={props.boardId}
				listsLength={lists.length}
				onAddList={addList}
			/>
		</div>
	);
};

export default ListsWrapper;
