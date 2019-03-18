import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Message from '../Message';
import TypingIndicator from '../TypingIndicator';
import styles from './styles';

function MessageList({
  messages,
  isLoadingMore,
  onLoadMore,
  classes,
}) {
  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      onLoadMore();
    }
  };

  return (
    <>
      {isLoadingMore && <LinearProgress />}
      <div className={classes.listWrapper} onScroll={handleScroll}>
        <List>
          {messages.map(message => (
            <Message key={message.id} {...message} />
          ))}
        </List>
      </div>
      <TypingIndicator />
    </>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)).isRequired,
  isLoadingMore: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

MessageList.defaultProps = {
  isLoadingMore: false,
};

export default withStyles(styles)(MessageList);
