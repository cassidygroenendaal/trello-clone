// ----------------- Dependencies ------------------

import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// import useOutsideClick from '../../hooks/useOutsideClick';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Dropdown ------------------

const SideMenu = props => {
	const [ isOpen, setIsOpen ] = useState(true),
		// [ active, setActive ] = useState(props.menu.title);
		[ active, setActive ] = useState('About This Board');

	return (
		<div>
			<button
				onClick={() => setIsOpen(true)}
				className={props.btnClass || styles.btnMain}
			>
				{props.children}
			</button>
			<div
				className={`${props.side === 'right'
					? isOpen ? styles.showRight : styles.hideRight
					: isOpen ? styles.showLeft : styles.hideLeft}`}
			>
				{active !== props.menu.title && (
					<button
						className={styles.backBtn}
						onClick={() => setActive(props.menu.title)}
					>
						&lt;
					</button>
				)}
				<p className={styles.title}>{active}</p>
				<button
					onClick={() => setIsOpen(false)}
					className={styles.closeBtn}
				>
					X
				</button>
				<hr className={styles.hr} />
				{active === props.menu.title ? (
					<ul className={styles.list}>
						{props.menu.main.map(item => (
							<li key={item.title}>
								<button
									onClick={() => {
										setActive(item.title);
									}}
									className={styles.btn}
								>
									{item.title}
								</button>
							</li>
						))}
					</ul>
				) : (
					props.menu.main.find(({ title }) => title === active)
						.component
				)}
			</div>
		</div>
	);
};

export default SideMenu;
