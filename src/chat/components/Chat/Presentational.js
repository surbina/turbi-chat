import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Bar from '../Bar';
import MessageForm from '../MessageForm';
import MessageList from '../MessageList';
import styles from './styles';

function Dashboard({ classes, isUserLogged }) {
  // Early return in case user is not already logged in
  if (!isUserLogged) {
    return (<Redirect to="/login" />);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Bar />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <MessageForm />

        <MessageList />
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  isUserLogged: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
