// ----------------- Dependencies ------------------

import React, { useState, useRef } from 'react';

import useOutsideClick from '../../hooks/useOutsideClick';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Dropdown ------------------

const Dropdown = props => {
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
				className={styles.btnMain}
			>
				Sorting by <span className={styles.bold}>{props.value}</span>
			</button>
			{isOpen ? (
				<div className={styles.container}>
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
					) : null}
				</div>
			) : null}
		</div>
	);
};

export default Dropdown;
