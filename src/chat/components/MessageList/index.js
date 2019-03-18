import { connect } from 'react-redux';
import MessageList from './Presentational';
import { fetchMoreMessages } from '../../actions';

const mapStateToProps = ({ chat: { messageList, isFetchingMore } }) => ({
  messages: messageList,
  isLoadingMore: isFetchingMore,
});

const mapDispatchToProps = {
  onLoadMore: fetchMoreMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
