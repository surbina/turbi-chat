import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Bar from '../Bar';
import MessageForm from '../MessageForm';
import MessageList from '../MessageList';
import styles from './styles';

function Dashboard({
  classes,
  isUserLogged,
  subscribeToChat,
  unsubscribeFromChat,
  subscribeToActiveUsers,
  unsubscribeFromActiveUsers,
}) {
  useEffect(() => {
    subscribeToChat();
    return unsubscribeFromChat;
  });

  useEffect(() => {
    subscribeToActiveUsers();
    return unsubscribeFromActiveUsers;
  });

  // Early return in case user is not already logged in
  if (!isUserLogged) {
    return (<Redirect to="/login" />);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Bar />

      <main className={classes.content}>
        <MessageList />
        <MessageForm />
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  isUserLogged: PropTypes.bool.isRequired,
  subscribeToChat: PropTypes.func.isRequired,
  unsubscribeFromChat: PropTypes.func.isRequired,
  subscribeToActiveUsers: PropTypes.func.isRequired,
  unsubscribeFromActiveUsers: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
