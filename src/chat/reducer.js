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

// For each message, check if the user has a color assigned
// If not, generate a color for that user
const calculateUserColors = (colorData, messages) => {
  let { userColors, reservedColors } = colorData;

  messages.forEach((message) => {
    const userId = selectors.getUserId({
      name: message.author,
      timestamp: message.authorTimestamp,
    });

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
  });

  return {
    userColors,
    reservedColors,
  };
};

export const reducer = handleActions({
  SHOW_CHAT: state => ({
    ...state,
    isChatVisible: true,
  }),
  APPEND_MESSAGES: (state, { payload: { messages } }) => ({
    ...state,
    messageList: state.messageList.concat(messages),
    ...calculateUserColors({
      userColors: state.userColors,
      reservedColors: state.reservedColors,
    }, messages),
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
  FINISH_FETCHING_MORE_MESSAGES: (
    state, { payload: { messages } },
  ) => ({
    ...state,
    isFetchingMore: false,
    messageList: messages.concat(state.messageList),
    ...calculateUserColors({
      userColors: state.userColors,
      reservedColors: state.reservedColors,
    }, messages),
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
