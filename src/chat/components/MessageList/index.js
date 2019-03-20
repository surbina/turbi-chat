import { connect } from 'react-redux';
import MessageList from './Presentational';
import { fetchMoreMessages } from '../../actions';

const mapStateToProps = ({ chat: { messageList, isFetchingMore, userColors }, login: { id } }) => ({
  messages: messageList,
  isLoadingMore: isFetchingMore,
  localUserId: id,
  userColors,
});

const mapDispatchToProps = {
  onLoadMore: fetchMoreMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
