import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function Message({ message, author }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={message}
        secondary={author}
      />
    </ListItem>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorTimestamp: PropTypes.string.isRequired,
};

export default Message;
