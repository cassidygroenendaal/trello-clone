// ----------------- Dependencies ------------------

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import MenuDropdown from '../MenuDropdown';
// import InputGroup from '../InputGroup';

// ----------------- Button ------------------

const Navbar = props => {
	const currentUser = useContext(CurrentUserContext);

	const listUserOpts = [
		{
			name : 'Profile and Visibility',
			to   : '/my-account',
			type : 'link'
		},
		{
			name : 'Cards',
			to   : '/my-account/cards',
			type : 'link'
		},
		{
			name : 'Log out',
			type : 'button'
		}
	];

	return (
		<nav
			className={styles.nav}
			style={{ background: props.background || '#026aa7' }}
		>
			{/* <MenuDropdown
				// value={}
				title="Filter Cards"
				// items={}
				type="select"
				// onClick={}
			/> */}

			<div className={styles.column}>
				<Link className={styles.btn} to="/b">
					H
				</Link>
				{/* <MenuDropdown btnClass={styles.btn}>b</MenuDropdown>
				<InputGroup inputClass={styles.search} type="search" /> */}
			</div>
			<h1 className={styles.brand}>Trello Clone</h1>
			<div className={styles.column}>
				{/* <MenuDropdown btnClass={styles.btn}>+</MenuDropdown> */}
				<MenuDropdown
					pos="right"
					title={`${currentUser.state.fullname} (${currentUser.state
						.username})`}
					items={listUserOpts}
					onClick={() => currentUser.logout()()}
					btnClass={styles.btn}
				>
					U
				</MenuDropdown>
			</div>
		</nav>
	);
};

export default Navbar;
