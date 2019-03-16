import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  PENDING_STATUS,
  SUCCESS_STATUS,
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
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  authorTimestamp: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  status: PropTypes.oneOf([PENDING_STATUS, SUCCESS_STATUS]).isRequired,
};

export default Message;
