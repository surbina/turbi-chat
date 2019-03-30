import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { withStyles } from '@material-ui/core/styles';
import getSmartPhoneDetector from 'detect-mobile-browser/detect-browser';
import { SUBMIT_BUTTON_LABEL } from './strings';
import styles from './styles';

const smartPhone = getSmartPhoneDetector(false);

function MessageForm({ onSubmit, onChange, classes }) {
  const [message, setMessage] = useState('');
  const input = useRef(null);
  const isSubmitDisabled = !(message.trim());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isSubmitDisabled) {
      setMessage('');
      onSubmit(message);
      input.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (!smartPhone.isAny() && event.keyCode === 13 && event.shiftKey === false) {
      handleSubmit(event);
    }
  };

  const handleChange = (event) => {
    onChange();
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Paper className={classes.paper} elevation={1}>
        <InputBase
          className={classes.input}
          multiline
          rowsMax="2"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
          inputRef={input}
        />
        <IconButton
          className={classes.iconButton}
          aria-label={SUBMIT_BUTTON_LABEL}
          type="submit"
          disabled={isSubmitDisabled}
        >
          <SendRoundedIcon />
        </IconButton>
      </Paper>
    </form>
  );
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageForm);
