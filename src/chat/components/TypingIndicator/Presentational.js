import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {
  TYPING_MESSAGE_SINGLE,
  TYPING_MESSAGE_DOUBLE,
  TYPING_MESSAGE_MANY,
} from './strings';

function TypingIndicator({ users }) {
  // Default to &nbsp; character so that ui does not get jumpy
  let message = '\u00A0';

  if (users.length === 1) {
    message = TYPING_MESSAGE_SINGLE(users);
  } else if (users.length === 2) {
    message = TYPING_MESSAGE_DOUBLE(users);
  } else if (users.length > 2) {
    message = TYPING_MESSAGE_MANY(users);
  }

  return (
    <Typography component="div" variant="caption" gutterBottom>
      {message}
    </Typography>
  );
}

TypingIndicator.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TypingIndicator;
