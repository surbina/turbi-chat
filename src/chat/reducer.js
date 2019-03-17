import { handleActions } from 'redux-actions';
import { selectors } from '../login';

const DEFAULT_STATE = {
  messageList: [],
  activeUsers: {},
};

export const reducer = handleActions({
  APPEND_MESSAGES: (state, { payload: { messages } }) => ({
    ...state,
    messageList: state.messageList.concat(messages),
  }),
  UPDATE_MESSAGE_STATUS: (state, { payload: { messageId, status } }) => {
    // We need to clone both the message and the message list
    const index = state.messageList.findIndex(m => m.id === messageId);
    const updatedMessage = {
      ...state.messageList[index],
      status,
    };

    return {
      ...state,
      messageList: Object.assign([], state.messageList, { [index]: updatedMessage }),
    };
  },
  ADD_ACTIVE_USER: (state, { payload: { user } }) => ({
    ...state,
    activeUsers: {
      ...state.activeUsers,
      [selectors.getUserId(user)]: user,
    },
  }),
  REMOVE_ACTIVE_USER: (state, { payload: { userId } }) => {
    const activeUsers = { ...state.activeUsers };
    delete activeUsers[userId];

    return {
      ...state,
      activeUsers,
    };
  },
}, DEFAULT_STATE);
