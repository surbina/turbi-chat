import { handleActions } from 'redux-actions';
import { selectors } from '../login';

const DEFAULT_STATE = {
  isFetchingMore: false,
  messageList: [],
  activeUsers: {},
};

export const reducer = handleActions({
  APPEND_MESSAGES: (state, { payload: { messages } }) => ({
    ...state,
    messageList: state.messageList.concat(messages),
  }),
  UPDATE_MESSAGE: (state, { payload: { message } }) => {
    // We need to clone both the message and the message list
    const index = state.messageList.findIndex(m => m.id === message.id);
    const updatedMessage = {
      ...state.messageList[index],
      ...message,
    };

    return {
      ...state,
      messageList: Object.assign([], state.messageList, { [index]: updatedMessage }),
    };
  },
  START_FETCHING_MORE_MESSAGES: state => ({
    ...state,
    isFetchingMore: true,
  }),
  FINISH_FETCHING_MORE_MESSAGES: (state, { payload: { messages } }) => ({
    ...state,
    isFetchingMore: false,
    messageList: messages.concat(state.messageList),
  }),
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
