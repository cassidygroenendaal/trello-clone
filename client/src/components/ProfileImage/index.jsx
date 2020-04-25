// ----------------- Dependencies ------------------

import React, { useContext } from 'react';

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- ProfileImage ------------------

const ProfileImage = props => {
	return (
		<div>
			{props.avatar ? (
				<img
					className={styles.avatar}
					src={props.avatar}
					alt="avatar"
				/>
			) : (
				<div className={styles.avatar}>
					<div className={styles.initials}>
						{props.initials}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileImage;
