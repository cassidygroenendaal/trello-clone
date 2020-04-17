import React, { createContext, useReducer } from 'react';

const StatusContext = createContext();

const initialState = {
	error   : undefined,
	success : undefined,
	code    : undefined
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'reset':
			return initialState;
		case 'set-error':
			return {
				...state,
				success : undefined,
				error   : action.payload
			};
		case 'set-success':
			return {
				...state,
				error   : undefined,
				success : action.payload
			};
		case 'set-code':
			return { ...state, code: action.payload };
		default:
			throw new Error();
	}
};

const StatusContextProvider = props => {
	const [ state, dispatch ] = useReducer(reducer, initialState);

	const reset = () => () => dispatch({ type: 'reset' }),
		setError = error => () =>
			dispatch({ type: 'set-error', payload: error }),
		setSuccess = success => () =>
			dispatch({ type: 'set-success', payload: success }),
		setCode = code => () =>
			dispatch({ type: 'set-code', payload: code });

	const value = { state, reset, setError, setSuccess, setCode };

	return (
		<StatusContext.Provider value={value}>
			{props.children}
		</StatusContext.Provider>
	);
};

const StatusContextConsumer = StatusContext.Consumer;

export {
	StatusContext,
	StatusContextProvider,
	StatusContextConsumer
};
