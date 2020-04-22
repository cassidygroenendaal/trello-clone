// ----------------- Dependencies ------------------

import React from 'react';
import { NavLink } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Button ------------------

const TabNav = props => {
	return (
		<nav>
			<ul className={styles.list}>
				{props.tabs.map(({ name, to }) => (
					<li key={to} className={styles.item}>
						<NavLink
							className={styles.link}
							activeClassName={styles.active}
							exact
							to={to}
						>
							{name}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default TabNav;
