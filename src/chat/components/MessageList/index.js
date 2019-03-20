import { connect } from 'react-redux';
import MessageList from './Presentational';
import { fetchMoreMessages } from '../../actions';
import { selectors } from '../../../login';

const mapStateToProps = ({ chat: { messageList, isFetchingMore, userColors }, login }) => ({
  messages: messageList,
  isLoadingMore: isFetchingMore,
  localUserId: selectors.getUserId(login),
  userColors,
});

const mapDispatchToProps = {
  onLoadMore: fetchMoreMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
