import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
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
  showAuthor,
  classes,
}) {
  const distance = timestamp ? distanceInWords(timestamp.toDate(), new Date()) : '';

  const primary = showAuthor
    ? (
      <Typography variant="subtitle2" color="textPrimary" gutterBottom>
        {author}
      </Typography>
    )
    : null;

  const secondary = (
    <React.Fragment>
      <Typography component="span" variant="body1" color="textPrimary">
        {message}
      </Typography>
      {status === SUCCESS_STATUS
        ? <Typography component="span" variant="caption" color="textPrimary">{distance}</Typography>
        : <ScheduleRoundedIcon fontSize="small" />}
    </React.Fragment>
  );

  return (
    <ListItem dense alignItems="flex-start" className={isCurrentUserMessage ? classes.currentUserMessage : ''}>
      <ListItemText
        primary={primary}
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
  showAuthor: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

Message.defaultProps = {
  timestamp: null,
};

export default withStyles(styles)(Message);
