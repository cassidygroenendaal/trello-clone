// ----------------- Dependencies ------------------

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useScrollPosition } from '../../hooks/useScrollPosition';

// ----------------- Other Dependencies ------------------

// ----------------- Stylesheet ------------------

import styles from './style.module.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';

// ----------------- Landing Page ------------------

const Landing = props => {
	const [ email, setEmail ] = useState(''),
		[ headerScrolled, setHeaderScrolled ] = useState('');

	useScrollPosition(({ prevPos, currPos }) => {
		return currPos.y < 0
			? setHeaderScrolled(styles.headerScrolled)
			: setHeaderScrolled('');
	});

	return (
		<div>
			<div>
				<header className={`${styles.header} ${headerScrolled}`}>
					<nav className={styles.nav}>
						<Link className={styles.brand} to="/">
							Trello Clone
						</Link>
						<div>
							<Link className={styles.linkBtn} to="/login">
								Log In
							</Link>
							<Link className={styles.linkBtnInverse} to="/register">
								Sign Up
							</Link>
						</div>
					</nav>
				</header>
				<main>
					<section className={styles.hero}>
						<div className={styles.row}>
							<div className={`${styles.intro} ${styles.col6}`}>
								<p className={styles.headline}>
									Trello Clone lets you work more collaboratively and
									get more done.
								</p>
								<p className={styles.info}>
									Trello Clone’s boards, lists, and cards enable you
									to organize and prioritize your projects in a fun,
									flexible, and rewarding way.
								</p>
							</div>
							<div className={`${styles.imageDiv} ${styles.col6}`}>
								<div className={styles.heroImage} />
								<div className={styles.heroImageShadow} />
							</div>
							<form className={styles.emailForm}>
								<InputGroup
									labelClass={styles.emailLabel}
									inputClass={styles.input}
									label="Email"
									name="email"
									type="email"
									value={email}
									placeholder="Email"
									onChange={e => setEmail(e.target.value)}
								/>
								<Link
									className={styles.linkBtnGreen}
									to={{ pathname: '/register', state: { email } }}
								>
									Sign Up - It's Free!
								</Link>
							</form>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default Landing;
