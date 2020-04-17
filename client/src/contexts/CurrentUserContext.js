import React, { createContext, useReducer } from 'react';

const CurrentUserContext = createContext();

const initialState = {
	email    : undefined,
	username : undefined,
	id       : undefined,
	isAuth   : false
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'reset':
			return initialState;
		case 'set-user':
			return { ...state, ...action.payload };
		case 'set-email':
			return { ...state, email: action.payload };
		case 'set-username':
			return { ...state, username: action.payload };
		case 'set-id':
			return { ...state, id: action.payload };
		case 'set-auth':
			return { ...state, isAuth: action.payload };
		default:
			throw new Error();
	}
};

const CurrentUserContextProvider = props => {
	const [ state, dispatch ] = useReducer(reducer, initialState);

	const reset = () => () => dispatch({ type: 'reset' }),
		setUser = user => () =>
			dispatch({ type: 'set-user', payload: user }),
		setEmail = email => () =>
			dispatch({ type: 'set-user', payload: email }),
		setUsername = username => () =>
			dispatch({ type: 'set-user', payload: username }),
		setId = id => () => dispatch({ type: 'set-user', payload: id }),
		setAuth = auth => () =>
			dispatch({ type: 'set-user', payload: auth });

	const value = {
		state,
		reset,
		setUser,
		setEmail,
		setUsername,
		setId,
		setAuth
	};

	return (
		<CurrentUserContext.Provider value={value}>
			{props.children}
		</CurrentUserContext.Provider>
	);
};

const CurrentUserContextConsumer = CurrentUserContext.Consumer;

export {
	CurrentUserContext,
	CurrentUserContextProvider,
	CurrentUserContextConsumer
};
