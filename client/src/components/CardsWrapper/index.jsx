// ----------------- Dependencies ------------------

import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';

// import useDebounce from '../../hooks/useDebounce';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

// import styles from './style.module.css';

// ----------------- Components ------------------

import Card from '../Card';

// ----------------- CardsWrapper ------------------

const CardsWrapper = props => {
	const currentUser = useContext(CurrentUserContext);

	const [ allCards, setAllCards ] = useState([]),
		[ cards, setCards ] = useState([]),
		[ archivedCards, setArchivedCards ] = useState([]),
		[ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			console.log('CARDS: INITIAL GET');
			API.Card
				.getAllInList(currentUser.getToken()(), props.listId)
				.then(res => {
					// console.log(res.data.cards);
					setAllCards(res.data.cards);
					filterAndSortCards(res.data.cards)
					setIsLoading(false);
				})
				.catch(err => console.log(err));
		},
		[currentUser, props.listId ]
	);

	const filterAndSortCards = cardsArray => {
		const cardsCopy = cardsArray.sort(
			(a, b) => a.position - b.position
		);

		const goodCards = cardsCopy.filter(card => !card.isArchived);
		const badCards = cardsCopy.filter(card => card.isArchived);

		setCards(goodCards);
		setArchivedCards(badCards);
	};

	return (
		<div>
			{!isLoading &&
				cards.map(card => (
					<Card key={`card-${card.id}`} card={card} />
				))}
		</div>
	);
};

export default CardsWrapper;
