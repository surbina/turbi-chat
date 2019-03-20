import { handleActions } from 'redux-actions';
import { selectors } from '../login';

const DEFAULT_STATE = {
  isChatVisible: false,
  isFetchingMore: false,
  messageList: [],
  activeUsers: {},
  userColors: {},
  reservedColors: {},
};

const generateRandomColor = (reservedColors) => {
  let color = Math.floor(Math.random() * 16777216).toString(16);
  while (reservedColors[color]) {
    color = Math.floor(Math.random() * 16777216).toString(16);
  }
  return '#000000'.slice(0, -color.length) + color;
};

export const reducer = handleActions({
  SHOW_CHAT: state => ({
    ...state,
    isChatVisible: true,
  }),
  APPEND_MESSAGES: (state, { payload: { messages } }) => {
    const userId = `${messages.author}${messages.authorTimestamp}`;
    let { userColors, reservedColors } = state;

    // If the user does not have a color assigned yet we need to pick one
    if (!userColors[userId]) {
      // We'll use a map and a reverse map to make this logic simple
      userColors = {
        ...userColors,
        [userId]: generateRandomColor(reservedColors),
      };

      reservedColors = {
        ...reservedColors,
        [userColors[userId]]: userId,
      };
    }

    return {
      ...state,
      messageList: state.messageList.concat(messages),
      userColors,
      reservedColors,
    };
  },
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
