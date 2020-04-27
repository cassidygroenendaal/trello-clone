// ----------------- Dependencies ------------------

import React from 'react';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

// import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';

// ----------------- List ------------------

const List = props => {
	return (
		<div>
			<InputGroup
				label="Title"
				type="text"
				name="title"
				id={`list-${props.list.title}-${props.list.id}`}
				value={props.list.title}
				onChange={e => {
					props.updateLists(props.list.id, {
						[e.target.name]: e.target.value
					});
				}}
			/>
		</div>
	);
};

export default List;
