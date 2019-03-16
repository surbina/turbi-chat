import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function Bar({ userName, classes }) {
  return (
    <AppBar
      position="absolute"
      className={classes.appBar}
    >
      <Toolbar disableGutters={false} className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Connected as {userName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Bar.propTypes = {
  userName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bar);
