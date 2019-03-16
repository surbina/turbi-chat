import { createAction } from 'redux-actions';
import uniqueId from 'lodash/uniqueId';
import { PENDING_STATUS } from './constants';

const appendMessagesToChat = createAction('APPEND_MESSAGE_TO_CHAT', messages => ({ messages }));

export const postMessageToChat = message => (dispatch, getState) => {
  const { name, timestamp } = getState().login;

  // optimiscally append message to chat => use a local id
  const optimisticId = uniqueId('message');
  dispatch(appendMessagesToChat({
    id: optimisticId,
    message,
    author: name,
    authorTimestamp: timestamp,
    status: PENDING_STATUS,
  }));

  // post message to chat
  //   if success => update status of message [SUCCESS]
  //   if fail => update status of message [FAIL]
};
