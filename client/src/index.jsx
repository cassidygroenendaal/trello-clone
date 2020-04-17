// ----------------- Dependencies ------------------

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// ----------------- Other Dependencies ------------------

import { StatusContextProvider } from './contexts/StatusContext';
import { CurrentUserContextProvider } from './contexts/CurrentUserContext';

// ----------------- Styling ------------------

import './style.css';

// ----------------- Components ------------------

import App from './components/App';

// ----------------- Other Components ------------------

import * as serviceWorker from './serviceWorker';

// ----------------- Render ------------------

ReactDOM.render(
	<BrowserRouter>
		<CurrentUserContextProvider>
			<StatusContextProvider>
				<App />
			</StatusContextProvider>
		</CurrentUserContextProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

// ----------------- Service Worker ------------------

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
