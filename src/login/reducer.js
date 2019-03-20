import { handleActions } from 'redux-actions';

const DEFAULT_STATE = {
  id: null,
  name: '',
};

// Reducers

export const reducer = handleActions({
  SET_USER_NAME: (state, { payload: { name } }) => ({
    id: `${name}-${String(Date.now())}`,
    name,
  }),
}, DEFAULT_STATE);

// Selectors

const isUserLogged = ({ login: { name, id } }) => (!!name && !!id);

export const selectors = { isUserLogged };
