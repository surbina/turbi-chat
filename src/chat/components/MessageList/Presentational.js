import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Message from '../Message';
import TypingIndicator from '../TypingIndicator';

function MessageList({ messages }) {
  return (
    <React.Fragment>
      <List>
        {messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </List>
      <TypingIndicator />
    </React.Fragment>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)).isRequired,
};

export default MessageList;
