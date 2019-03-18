import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Message from '../Message';
import TypingIndicator from '../TypingIndicator';
import styles from './styles';

function MessageList({ messages, classes }) {
  return (
    <div className={classes.listWrapper}>
      <List>
        {messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </List>
      <TypingIndicator />
    </div>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageList);
