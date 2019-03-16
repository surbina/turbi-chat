import { createAction } from 'redux-actions';
import {
  PENDING_STATUS,
  SUCCESS_STATUS,
} from './constants';

const appendMessages = createAction('APPEND_MESSAGES', messages => ({ messages }));

const updateMessageStatus = createAction('UPDATE_MESSAGE_STATUS', (messageId, status) => ({ messageId, status }));

export const postMessage = message => (dispatch, getState, { firebase }) => {
  const { name, timestamp } = getState().login;

  return firebase.postMessage({
    message,
    author: name,
    authorTimestamp: timestamp,
  });
};

export const subscribeToChat = () => (dispatch, getState, { firebase }) => {
  const { name, timestamp } = getState().login;

  firebase.subscribeToChat((changes) => {
    changes.forEach((change) => {
      const data = change.doc.data();

      if (change.doc.metadata.hasPendingWrites) {
        // message has not been send to the server => make an optimistic update
        dispatch(appendMessages({
          id: data.id,
          message: data.message,
          author: data.author,
          authorTimestamp: data.authorTimestamp,
          status: PENDING_STATUS,
        }));
      } else if (name === data.author && timestamp === data.authorTimestamp) {
        // message has been saved to the server
        dispatch(updateMessageStatus(data.id, SUCCESS_STATUS));
      } else {
        // message is saved in the server and was posted by other user
        dispatch(appendMessages({
          id: data.id,
          message: data.message,
          author: data.author,
          authorTimestamp: data.authorTimestamp,
          status: SUCCESS_STATUS,
        }));
      }
    });
  });
};

export const unsubscribeFromChat = () => (dispatch, getState, { firebase }) => {
  firebase.unsubscribeFromChat();
};
