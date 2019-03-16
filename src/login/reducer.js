import { handleActions } from 'redux-actions';

const DEFAULT_STATE = {
  name: '',
  timestamp: null,
};

// Reducers

export const reducer = handleActions({
  SET_USER_NAME: (state, { payload: { name } }) => ({
    name,
    timestamp: Date.now(),
  }),
}, DEFAULT_STATE);

// Selectors

const isUserLogged = ({ login: { name, timestamp } }) => (!!name && !!timestamp);

export const selectors = { isUserLogged };
