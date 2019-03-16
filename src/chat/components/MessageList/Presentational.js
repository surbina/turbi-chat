import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Message from '../Message';

function MessageList({ messages }) {
  return (
    <List>
      {messages.map(message => <Message {...message}/>)}
    </List>
  );
}

const messageShape = PropTypes.shape({
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorTimestamp: PropTypes.string.isRequired,
});

MessageList.propTypes = {
  messages: PropTypes.arrayOf(messageShape).isRequired,
};

export default MessageList;
