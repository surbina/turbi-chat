import { handleActions } from 'redux-actions';

const DEFAULT_STATE = {
  name: '',
  timestamp: null,
};

// Reducers

export const reducer = handleActions({
  SET_USER_NAME: (state, { payload: { name } }) => ({
    name,
    timestamp: String(Date.now()),
  }),
}, DEFAULT_STATE);

// Selectors

const isUserLogged = ({ login: { name, timestamp } }) => (!!name && !!timestamp);

// Not quiet a selector, but really handy xD
const getUserId = user => `${user.name}${user.timestamp}`;

export const selectors = { isUserLogged, getUserId };
