import { handleActions } from 'redux-actions';

const DEFAULT_STATE = {
  messageList: [],
  activeUsers: [],
};

export const reducer = handleActions({
  APPEND_MESSAGE_TO_CHAT: (state, { payload: { messages } }) => ({
    ...state,
    messageList: state.messageList.concat(messages),
  }),
}, DEFAULT_STATE);
