// ----------------- Dependencies ------------------

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import useOutsideClick from '../../hooks/useOutsideClick';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Dropdown ------------------

const MenuDropdown = props => {
	const [ isOpen, setIsOpen ] = useState(false);

	const selectItem = value => {
		props.onClick(value);
		setIsOpen(false);
	};

	const ref = useRef();

	useOutsideClick(ref, () => {
		setIsOpen(false);
	});

	return (
		<div ref={ref}>
			<button
				onClick={() => setIsOpen(true)}
				className={props.btnClass || styles.btnMain}
			>
				{props.children}
			</button>
			{isOpen && (
				<div
					className={
						props.pos === 'left' ? (
							styles.containerLeft
						) : props.pos === 'right' ? (
							styles.containerRight
						) : (
							styles.container
						)
					}
				>
					<p className={styles.title}>{props.title}</p>
					<button
						onClick={() => setIsOpen(false)}
						className={styles.closeBtn}
					>
						X
					</button>
					<hr className={styles.hr} />
					{props.type === 'select' ? (
						<ul className={styles.list}>
							{props.items.map(({ name, value, isSelected }) => (
								<li key={value}>
									<button
										onClick={() => {
											selectItem(value);
										}}
										className={styles.btn}
									>
										<div>{name}</div>
										<div>{isSelected ? 'O' : null}</div>
									</button>
								</li>
							))}
						</ul>
					) : (
						<ul className={styles.list}>
							{props.items.map(
								item =>
									item.type === 'link' ? (
										<li key={item.name}>
											<Link to={item.to} className={styles.btn}>
												{item.name}
											</Link>
										</li>
									) : item.type === 'button' ? (
										<li key={item.name}>
											<button
												onClick={item.func}
												className={styles.btn}
											>
												{item.name}
											</button>
										</li>
									) : (
										<li key={item.name}>{item.name}</li>
									)
							)}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

export default MenuDropdown;
