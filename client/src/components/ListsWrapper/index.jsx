// ----------------- Dependencies ------------------

import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';

import useDebounce from '../../hooks/useDebounce';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

// import styles from './style.module.css';

// ----------------- Components ------------------

import List from '../List';

// ----------------- ListsWrapper ------------------

const ListsWrapper = props => {
	const currentUser = useContext(CurrentUserContext);

	const [ lists, setLists ] = useState([]),
		[ listToUpdate, setListToUpdate ] = useState({}),
		[ isLoading, setIsLoading ] = useState(true);

	const debouncedList = useDebounce(listToUpdate, 1000);

	useEffect(
		() => {
			if (debouncedList.id) {
				API.List
					.updateOne(
						currentUser.getToken()(),
						debouncedList.id,
						debouncedList
					)
					.then(res => {})
					.catch(err => console.log(err));
				console.log('Update firing!', debouncedList);
			} else {
				console.log('Initial GET');
				API.List
					.getAllInBoard(currentUser.getToken()(), props.boardId)
					.then(res => {
						setLists(res.data.lists);
						setIsLoading(false);
					})
					.catch(err => console.log(err));
			}
		},
		[ debouncedList, currentUser, props.boardId ]
	);

	const updateLists = (listId, info) => {
		let listsCopy = [ ...lists ];

		const foundIndex = listsCopy.findIndex(
			list => list.id === listId
		);

		listsCopy[foundIndex] = { ...listsCopy[foundIndex], ...info };

		setLists(listsCopy);
		setListToUpdate(listsCopy[foundIndex]);
	};

	return (
		<div>
			{!isLoading &&
				lists.map(list => (
					<List
						key={`list-${list.id}`}
						list={list}
						updateLists={updateLists}
					/>
				))}
		</div>
	);
};

export default ListsWrapper;
