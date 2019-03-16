import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SUBMIT_BUTTON_LABEL } from './strings';

function MessageForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const form = useRef(null);
  const isSubmitDisabled = !(message.trim());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isSubmitDisabled) {
      setMessage('');
      onSubmit(message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      handleSubmit(event);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit}>
      <TextField
        id="message-input"
        multiline
        rows="4"
        margin="normal"
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isSubmitDisabled}
      >
        {SUBMIT_BUTTON_LABEL}
      </Button>
    </form>
  );
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MessageForm;
