import { connect } from 'react-redux';
import MessageList from './Presentational';

const mapStateToProps = ({ chat: { messageList } }) => ({
  messages: messageList,
});

export default connect(mapStateToProps)(MessageList);
