// ----------------- Dependencies ------------------

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useScrollPosition } from '../../hooks/useScrollPosition';

// ----------------- Other Dependencies ------------------

// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import API from '../../lib/API';

// ----------------- Stylesheet ------------------

import './style.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
// import Button from '../../components/Button';

// ----------------- Landing Page ------------------

const Landing = props => {
	const [ email, setEmail ] = useState(''),
		[ headerScrolled, setHeaderScrolled ] = useState('');

	useScrollPosition(({ prevPos, currPos }) => {
		return currPos.y < 0
			? setHeaderScrolled('nav-header--scrolled')
			: setHeaderScrolled('');
	});

	return (
		<div>
			<div>
				<header className={`nav-header ${headerScrolled}`}>
					<nav className="nav-home">
						<Link className="nav-home__link nav-home__brand" to="/">
							Trello Clone
						</Link>
						<div>
							<Link
								className="nav-home__link nav-home__link-btn"
								to="/login"
							>
								Log In
							</Link>
							<Link
								className="nav-home__link nav-home__link-btn nav-home__link-btn--inverse"
								to="/register"
							>
								Sign Up
							</Link>
						</div>
					</nav>
				</header>
				<main>
					<section className="intro">
						<p>
							Trello Clone lets you work more collaboratively and get
							more done.
						</p>
						<p>
							Trello Clone’s boards, lists, and cards enable you to
							organize and prioritize your projects in a fun,
							flexible, and rewarding way.
						</p>
						<form>
							<InputGroup
								name="email"
								type="email"
								value={email}
								placeholder="Email"
								onChange={e => setEmail(e.target.value)}
							/>
							<Link to={{ pathname: '/register', state: { email } }}>
								Sign Up - It's Free!
							</Link>
						</form>
					</section>
				</main>
			</div>
		</div>
	);
};

export default Landing;
