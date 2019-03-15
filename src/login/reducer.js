import { handleActions } from 'redux-actions';

const DEFAULT_STATE = {
  name: '',
  timestamp: '',
};

export default handleActions({
  SET_USER_NAME: (state, { payload: { name } }) => ({
    name,
    timestamp: Date.now(),
  }),
}, DEFAULT_STATE);
