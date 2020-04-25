// ----------------- Dependencies ------------------

import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import TabNav from '../../components/TabNav';
import ProfileImage from '../ProfileImage';

// ----------------- AccountHeader ------------------

const AccountHeader = props => {
	const currentUser = useContext(CurrentUserContext);

	const { url } = useRouteMatch();

	const listTabs = [
		{
			name : 'Profile and Visibility',
			to   : url
		},
		{
			name : 'Cards',
			to   : `${url}/cards`
		}
	];

	return (
		<header className={styles.header}>
			<div className={styles.info}>
				<ProfileImage
					avatar={currentUser.state.avatar}
					initials={currentUser.state.initials}
				/>
				<div className={styles.fullname}>
					{currentUser.state.fullname}
				</div>
				<div className={styles.username}>
					@{currentUser.state.username}
				</div>
			</div>
			<TabNav tabs={listTabs} />
		</header>
	);
};

export default AccountHeader;
