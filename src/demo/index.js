import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const SRC = process.env.NODE_ENV === 'production'
  ? `https://${process.env.REACT_APP_AUTH_DOMAIN}`
  : 'http://localhost:3000/';

function Demo({ classes }) {
  return (
    <div className={classes.container}>
      <CssBaseline />
      <iframe
        title="Laura's Chat"
        src={SRC}
        className={classes.frame}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>

      <iframe
        title="Laura's Chat"
        src={SRC}
        className={classes.frame}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Demo);
