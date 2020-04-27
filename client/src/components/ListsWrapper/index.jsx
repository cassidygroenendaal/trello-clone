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
		[ isLoading, setIsLoading ] = useState(true);

	const debouncedList = useDebounce(listToUpdate, 1000);

	useEffect(
		() => {
			if (debouncedList.title) {
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
						filterLists(res.data.lists);
						setIsLoading(false);
					})
					.catch(err => console.log(err));
			}
		},
		[ debouncedList, currentUser, props.boardId ]
	);

	const filterLists = listArray => {
		const goodLists = listArray.filter(
			list => list.isArchived === false
		);

		const badLists = listArray.filter(
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

		listsCopy[foundIndex] = { ...listsCopy[foundIndex], ...info };

		setAllLists(listsCopy);
		filterLists(listsCopy);
		setListToUpdate(listsCopy[foundIndex]);
	};

	const addList = newList => {
		API.List
			.createOne(currentUser.getToken()(), newList)
			.then(res => {
				setAllLists([ ...allLists, res.data.list ]);
				filterLists([ ...allLists, res.data.list ]);
			})
			.catch(err => console.log(err));
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
