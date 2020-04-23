// ----------------- Dependencies ------------------

import React, { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';

import useOutsideClick from '../../hooks/useOutsideClick';

// ----------------- Other Dependencies ------------------

// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { StatusContext } from '../../contexts/StatusContext';
// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';

// ----------------- LoginForm ------------------

const CreateBoardModal = props => {
	// const currentUser = useContext(CurrentUserContext),
	// 	status = useContext(StatusContext);

	const [ isOpen, setIsOpen ] = useState(true),
		[ isDisabled, setIsDisabled ] = useState(true),
		[ board, setBoard ] = useState({});

	const ref = useRef();

	useOutsideClick(ref, () => {
		setIsOpen(false);
	});

	// useEffect(() => {
	// 	status.reset()();
	// 	status.setCode(200)();
	// 	// eslint-disable-next-line
	// }, []);

	const submitForm = e => {
	// 	e.preventDefault();
	// 	if (email !== '' && password !== '') {
	// 		const user = { email, password };

	// 		API.User
	// 			.login(user)
	// 			.then(response => {
	// 				console.log(response.data);
	// 				if (response.data.status === 200) {
	// 					status.setCode(200)();
	// 					status.setSuccess(
	// 						"You've been successfully logged in."
	// 					)();
	// 					currentUser.login(
	// 						response.data.user,
	// 						response.data.user.authToken
	// 					)();
	// 					props.history.push('/');
	// 				} else {
	// 					status.setError(response.data.message)();
	// 					status.setCode(response.data.status)();
	// 					currentUser.reset()();
	// 				}
	// 			})
	// 			.catch(err => console.log(err));
	// 	}
	};

	const modalClick = e => {
		e.stopPropagation();
	};

	return (
		<div ref={ref} className={props.className}>
			{/* Modal Toggle Button */}
			<button className={styles.btn} onClick={() => setIsOpen(true)}>
				{props.children}
			</button>
			{/* End Modal Toggle Button */}
			{/* Modal */}
			{isOpen ? (
				<div
					onClick={() => setIsOpen(false)}
					className={styles.modalContainer}
				>
					<div className={styles.modal} onClick={modalClick}>
						<form>
							<Button disabled={isDisabled} value="Create Board" />
						</form>
					</div>
				</div>
			) : null}
			{/* End Modal */}
		</div>
	);
};

export default CreateBoardModal;
