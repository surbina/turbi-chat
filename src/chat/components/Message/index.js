import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  PENDING_STATUS,
  SUCCESS_STATUS,
  FAIL_STATUS,
 } from '../../constants';

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
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorTimestamp: PropTypes.string.isRequired,
  status: PropTypes.oneOf([PENDING_STATUS, SUCCESS_STATUS, FAIL_STATUS]).isRequired,
};

export default Message;
