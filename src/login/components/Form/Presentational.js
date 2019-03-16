import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';
import styles from './styles';
import {
  NAME_LABEL,
  FORM_TITLE,
  SUBMIT_BUTTON_LABEL,
} from './strings';

function LoginForm({ classes, isUserLogged, onSubmit }) {
  const [name, setName] = useState('');

  // Early return in case user is already logged in
  if (isUserLogged) {
    return (<Redirect to="/chat" />);
  }

  const isSubmitDisabled = !(name.trim());

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          {FORM_TITLE}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">{NAME_LABEL}</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitDisabled}
          >
            {SUBMIT_BUTTON_LABEL}
          </Button>
        </form>
      </Paper>
    </main>
  );
}

LoginForm.propTypes = {
  isUserLogged: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
