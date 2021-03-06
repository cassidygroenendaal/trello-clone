import React, { createContext, useReducer } from 'react';

const CurrentUserContext = createContext();

const initialState = {
	email     : undefined,
	username  : undefined,
	fullname  : undefined,
	bio       : undefined,
	initials  : undefined,
	avatar    : undefined,
	id        : undefined,
	isAuth    : false,
	authToken : localStorage.getItem('token')
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'reset':
			return { ...initialState, authToken: undefined };
		case 'set-user':
			return { ...state, ...action.payload };
		case 'set-email':
			return { ...state, email: action.payload };
		case 'set-username':
			return { ...state, username: action.payload };
		case 'set-fullname':
			return { ...state, fullname: action.payload };
		case 'set-bio':
			return { ...state, bio: action.payload };
		case 'set-initials':
			return { ...state, initials: action.payload };
		case 'set-avatar':
			return { ...state, avatar: action.payload };
		case 'set-id':
			return { ...state, id: action.payload };
		case 'set-auth':
			return { ...state, isAuth: action.payload };
		case 'set-token':
			return { ...state, authToken: action.payload };
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
			dispatch({ type: 'set-email', payload: email }),
		setUsername = username => () =>
			dispatch({ type: 'set-username', payload: username }),
		setFullname = fullname => () =>
			dispatch({ type: 'set-fullname', payload: fullname }),
		setBio = bio => () => dispatch({ type: 'set-bio', payload: bio }),
		setInitials = initials => () =>
			dispatch({ type: 'set-initials', payload: initials }),
		setAvatar = avatar => () =>
			dispatch({ type: 'set-avatar', payload: avatar }),
		setId = id => () => dispatch({ type: 'set-id', payload: id }),
		setAuth = auth => () =>
			dispatch({ type: 'set-auth', payload: auth }),
		setToken = token => () =>
			dispatch({ type: 'set-token', payload: token }),
		storeToken = token => () => localStorage.setItem('token', token),
		getToken = () => () => localStorage.getItem('token'),
		clearToken = () => () => localStorage.removeItem('token'),
		login = (user, token) => () => {
			setUser(user)();
			storeToken(token)();
		},
		logout = () => () => {
			clearToken()();
			reset()();
		};

	const value = {
		state,
		reset,
		setUser,
		setEmail,
		setFullname,
		setBio,
		setInitials,
		setAvatar,
		setUsername,
		setId,
		setAuth,
		storeToken,
		setToken,
		getToken,
		clearToken,
		login,
		logout
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
