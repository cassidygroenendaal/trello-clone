// ----------------- Dependencies ------------------

import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import TabNav from '../../components/TabNav';

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
		},
		{
			name : 'Settings',
			to   : `${url}/settings`
		}
	];

	return (
		<header className={styles.header}>
			<div className={styles.info}>
				{currentUser.state.avatar ? (
					<img
						className={styles.avatar}
						src={currentUser.state.avatar}
						alt="avatar"
					/>
				) : (
					<div className={styles.avatar}>
						<div className={styles.initials}>
							{currentUser.state.initials}
						</div>
					</div>
				)}
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
