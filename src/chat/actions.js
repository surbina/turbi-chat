import { createAction } from 'redux-actions';
import uniqueId from 'lodash/uniqueId';
import {
  PENDING_STATUS,
  SUCCESS_STATUS,
  FAIL_STATUS,
} from './constants';

const appendMessages = createAction('APPEND_MESSAGES', messages => ({ messages }));

const updateMessageStatus = createAction('UPDATE_MESSAGE_STATUS', (messageId, status) => ({ messageId, status }));

export const postMessage = message => (dispatch, getState, { firebase }) => {
  const { name, timestamp } = getState().login;

  // optimiscally append message to chat => use a local id
  const optimisticId = uniqueId('message');
  dispatch(appendMessages({
    id: optimisticId,
    message,
    author: name,
    authorTimestamp: timestamp,
    status: PENDING_STATUS,
  }));

  return firebase.postMessage({
    message,
    author: name,
    authorTimestamp: timestamp,
  })
    .then(() => {
      dispatch(updateMessageStatus(optimisticId, SUCCESS_STATUS));
    })
    .catch(() => {
      dispatch(updateMessageStatus(optimisticId, FAIL_STATUS));
    });
};
