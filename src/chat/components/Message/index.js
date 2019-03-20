import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import { format } from 'date-fns';
import styles from './styles';
import {
  PENDING_STATUS,
  SUCCESS_STATUS,
} from '../../constants';

function Message({
  message,
  author,
  authorColor,
  status,
  timestamp,
  isCurrentUserMessage,
  showAuthor,
  classes,
}) {
  const time = timestamp ? format(timestamp.toDate(), 'HH:mm') : '';

  const primary = showAuthor
    ? (
      // This feels a little bit hacky, but I couldn't find another way
      // to dinamically change the color
      <div style={{ color: authorColor }}>
        <Typography
          variant="subtitle2"
          color="inherit"
          className={classes.authorName}
          gutterBottom
        >
          {author}
        </Typography>
      </div>
    )
    : null;

  const secondary = (
    <React.Fragment>
      <Typography component="span" variant="body1" color="textPrimary" className={classes.message}>
        {message}
      </Typography>
      {status === SUCCESS_STATUS
        ? <Typography component="span" variant="caption" color="textPrimary" className={classes.timeIndicator}>{time}</Typography>
        : <ScheduleRoundedIcon fontSize="small" />}
    </React.Fragment>
  );

  const listItemClassName = classNames(
    classes.item,
    isCurrentUserMessage && classes.alignRight,
  );

  return (
    <ListItem dense alignItems="flex-start" className={listItemClassName}>
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
  authorColor: PropTypes.string.isRequired,
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
