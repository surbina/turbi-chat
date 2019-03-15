import { createAction } from 'redux-actions';

export const setUserName = createAction('SET_USER_NAME', name => ({ name }));
