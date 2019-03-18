import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import { distanceInWords } from 'date-fns';
import styles from './styles';
import {
  PENDING_STATUS,
  SUCCESS_STATUS,
} from '../../constants';

function Message({
  message,
  author,
  status,
  timestamp,
  isCurrentUserMessage,
  classes,
}) {
  const distance = timestamp ? distanceInWords(timestamp.toDate(), new Date()) : '';

  let secondary = `${author} - ${distance}`;

  if (isCurrentUserMessage) {
    secondary = status === SUCCESS_STATUS
      ? distance
      : <ScheduleRoundedIcon fontSize="small" />;
  }

  return (
    <ListItem alignItems="flex-start" className={isCurrentUserMessage ? classes.currentUserMessage : ''}>
      <ListItemText
        primary={message}
        secondary={secondary}
      />
    </ListItem>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf([PENDING_STATUS, SUCCESS_STATUS]).isRequired,
  timestamp: PropTypes.object,
  isCurrentUserMessage: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

Message.defaultProps = {
  timestamp: null,
};

export default withStyles(styles)(Message);
