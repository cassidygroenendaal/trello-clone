// ----------------- Dependencies ------------------

// import React, { useState, useEffect, useContext } from 'react';
import React from 'react';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';

// import useDebounce from '../../hooks/useDebounce';

// ----------------- Other Dependencies ------------------

// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

// ----------------- Card ------------------

const Card = props => {
	// const currentUser = useContext(CurrentUserContext);

	return (
		<div className={styles.container}>
			<p className={styles.title}>{props.card.title}</p>
		</div>
	);
};

export default Card;