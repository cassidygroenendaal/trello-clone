// ----------------- Dependencies ------------------

import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// import useOutsideClick from '../../hooks/useOutsideClick';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Dropdown ------------------

const SideMenu = props => {
	const [ isOpen, setIsOpen ] = useState(false),
		[ active, setActive ] = useState(props.menu.title),
		[ submenu, setSubmenu ] = useState('');

	const selectSubmenu = activeSubmenu => {
		setActive(activeSubmenu);
		setSubmenu(activeSubmenu);
	};

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
				<button
					className={
						active === props.menu.title ? (
							styles.backBtnHide
						) : (
							styles.backBtnShow
						)
					}
					onClick={() => setActive(props.menu.title)}
				>
					&lt;
				</button>
				<p className={styles.title}>{active}</p>
				<button
					onClick={() => setIsOpen(false)}
					className={styles.closeBtn}
				>
					X
				</button>
				<hr className={styles.hr} />
				<div
					className={
						active === props.menu.title ? (
							styles.mainMenuShow
						) : (
							styles.mainMenuHide
						)
					}
				>
					<ul className={styles.list}>
						{props.menu.main.map(item => (
							<li key={item.title}>
								<button
									onClick={() => {
										selectSubmenu(item.title);
									}}
									className={styles.btn}
								>
									{item.title}
								</button>
							</li>
						))}
					</ul>
				</div>
				<div
					className={
						active !== props.menu.title ? (
							styles.subMenuShow
						) : (
							styles.subMenuHide
						)
					}
					style={{top: `-${props.menu.main.length * 2.25}em`}}
				>
					{submenu &&
						props.menu.main.find(({ title }) => title === submenu)
							.component}
				</div>
			</div>
		</div>
	);
};

export default SideMenu;
