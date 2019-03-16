import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Message from '../Message';

function MessageList({ messages }) {
  return (
    <List>
      {messages.map(message => (
        <Message key={message.id} {...message} />
      ))}
    </List>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)).isRequired,
};

export default MessageList;
