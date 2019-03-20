import { createAction } from 'redux-actions';
import {
  PENDING_STATUS,
  SUCCESS_STATUS,
} from './constants';

const appendMessages = createAction('APPEND_MESSAGES', messages => ({ messages }));

const updateMessage = createAction('UPDATE_MESSAGE', message => ({ message }));

export const postMessage = message => (dispatch, getState, { firebase }) => {
  const { id, name } = getState().login;

  return firebase.postMessage({
    message,
    author: name,
    authorId: id,
  });
};

const showChat = createAction('SHOW_CHAT');

export const subscribeToChat = () => (dispatch, getState, { firebase }) => {
  firebase.subscribeToChat((changes) => {
    const {
      login,
      chat: { isChatVisible },
    } = getState();

    changes.forEach((change) => {
      const data = change.doc.data();

      if (change.doc.metadata.hasPendingWrites) {
        // message has not been send to the server => make an optimistic update
        dispatch(appendMessages([{
          id: data.id,
          message: data.message,
          author: data.author,
          authorId: data.authorId,
          status: PENDING_STATUS,
          timestamp: data.timestamp,
        }]));
      } else if (login.id === data.authorId) {
        // message has been saved to the server
        dispatch(updateMessage({
          id: data.id,
          timestamp: data.timestamp,
          status: SUCCESS_STATUS,
        }));
      } else {
        // message is saved in the server and was posted by other user
        dispatch(appendMessages([{
          id: data.id,
          message: data.message,
          author: data.author,
          authorId: data.authorId,
          status: SUCCESS_STATUS,
          timestamp: data.timestamp,
        }]));
      }
    });

    if (!isChatVisible) {
      dispatch(showChat());
    }
  });
};

const startFetchingMoreMessages = createAction('START_FETCHING_MORE_MESSAGES');

const finishFetchingMoreMessages = createAction('FINISH_FETCHING_MORE_MESSAGES', messages => ({ messages }));

export const fetchMoreMessages = () => (dispatch, getState, { firebase }) => {
  const { isFetchingMore, messageList } = getState().chat;

  if (isFetchingMore || messageList.length === 0) {
    // Early return in case we are already fetching a page
    return;
  }

  dispatch(startFetchingMoreMessages());

  firebase.loadMoreMessages(messageList[0].timestamp)
    .then((changes) => {
      const docs = changes.map(change => ({
        ...change.doc.data(),
        status: SUCCESS_STATUS,
      }));

      dispatch(finishFetchingMoreMessages(docs));
    });
};

export const unsubscribeFromChat = () => (dispatch, getState, { firebase }) => {
  firebase.unsubscribeFromChat();
};

export const setUserActive = () => (dispatch, getState, { firebase }) => {
  const user = getState().login;

  firebase.setUserActive(user);
};

export const addActiveUser = createAction('ADD_ACTIVE_USER', user => ({ user }));

export const removeActiveUser = createAction('REMOVE_ACTIVE_USER', userId => ({ userId }));

export const subscribeToActiveUsers = () => (dispatch, getState, { firebase }) => {
  const user = getState().login;

  firebase.subscribeToActiveUsers((changes) => {
    changes.forEach((change) => {
      const data = change.doc.data();

      if (data.id === user.id) {
        // Disregard operations from local user
        return;
      }

      if (change.type === 'added') {
        dispatch(addActiveUser(data));
      } else if (change.type === 'removed') {
        dispatch(removeActiveUser(data.id));
      }
    });
  });
};

export const unsubscribeFromActiveUsers = () => (dispatch, getState, { firebase }) => {
  firebase.unsubscribeFromActiveUsers();
};
