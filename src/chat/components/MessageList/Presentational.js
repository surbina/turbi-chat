import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Message from '../Message';
import TypingIndicator from '../TypingIndicator';
import styles from './styles';
import {
  PENDING_STATUS,
  SUCCESS_STATUS,
} from '../../constants';

function MessageList({
  messages,
  isLoadingMore,
  localUserId,
  userColors,
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
          {messages.map((message, index) => {
            const isCurrentUserMessage = localUserId === message.authorId;
            const showAuthor = !isCurrentUserMessage
              && (index === 0 || message.authorId !== messages[index - 1].authorId);

            return (
              <Message
                key={message.id}
                message={message.message}
                author={message.author}
                authorColor={userColors[message.authorId]}
                status={message.status}
                timestamp={message.timestamp}
                isCurrentUserMessage={isCurrentUserMessage}
                showAuthor={showAuthor}
              />
            );
          })}
        </List>
      </div>
      <TypingIndicator />
    </>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    timestamp: PropTypes.object,
    status: PropTypes.oneOf([PENDING_STATUS, SUCCESS_STATUS]).isRequired,
  })).isRequired,
  isLoadingMore: PropTypes.bool,
  localUserId: PropTypes.string.isRequired,
  userColors: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

MessageList.defaultProps = {
  isLoadingMore: false,
};

export default withStyles(styles)(MessageList);
