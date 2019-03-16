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
}, DEFAULT_STATE);
