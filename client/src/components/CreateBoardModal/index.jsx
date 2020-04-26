// ----------------- Dependencies ------------------

import React, {
	useState,
	useRef,
	useEffect,
	useContext
} from 'react';
// import { Link } from 'react-router-dom';

import useOutsideClick from '../../hooks/useOutsideClick';

// ----------------- Other Dependencies ------------------

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { StatusContext } from '../../contexts/StatusContext';
// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import API from '../../lib/API';

// ----------------- LoginForm ------------------

const CreateBoardModal = props => {
	const currentUser = useContext(CurrentUserContext),
		status = useContext(StatusContext);

	const [ isOpen, setIsOpen ] = useState(false),
		[ isDisabled, setIsDisabled ] = useState(true),
		[ title, setTitle ] = useState(''),
		[ background, setBackground ] = useState('#0079bf');

	const ref = useRef();

	const closeModal = () => {
		setIsOpen(false);
		setTitle('');
		setBackground('#0079bf');
	};

	useOutsideClick(ref, closeModal);

	useEffect(
		() => {
			const board = { title, background };

			if (checkForm(board)) {
				setIsDisabled(false);
			} else {
				setIsDisabled(true);
			}

			status.reset()();
			status.setCode(200)();
		},
		// eslint-disable-next-line
		[ title, background ]
	);

	const listColorOpts = [
		'#0079bf',
		'#d29034',
		'#519839',
		'#b04632',
		'#89609e',
		'#cd5a91'
	];

	const checkForm = board => {
		for (let key in board) {
			if (!board[key]) return false;
		}
		return true;
	};

	const submitForm = e => {
		e.preventDefault();

		const board = { title, background };

		if (checkForm(board)) {
			console.log(board);

			API.Board
				.createOne(currentUser.getToken()(), board)
				.then(res => {
					console.log(res.data);
					closeModal();
					props.afterCreate();
				})
				.catch(err => {
					console.log(err);
				});
		}
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
				<div onClick={closeModal} className={styles.modalContainer}>
					<div className={styles.modal} onClick={modalClick}>
						<form>
							<div
								className={styles.boardContainer}
								style={{ backgroundColor: background }}
							>
								<InputGroup
									label="Title"
									inputClass={styles.input}
									name="title"
									value={title}
									placeholder="Add board title"
									onChange={e => setTitle(e.target.value)}
								/>
							</div>
							<div className={styles.radioGroup}>
								{listColorOpts.map(color => (
									<InputGroup
										key={color}
										id={color}
										labelClass={styles.radioLabel}
										labelStyle={{ backgroundColor: color }}
										inputClass={styles.radioInput}
										type="radio"
										name="background"
										value={color}
										checked={background === color}
										onChange={e => setBackground(e.target.value)}
									/>
								))}
							</div>
							<Button
								disabled={isDisabled}
								value="Create Board"
								onClick={submitForm}
							/>
						</form>
					</div>
				</div>
			) : null}
			{/* End Modal */}
		</div>
	);
};

export default CreateBoardModal;
