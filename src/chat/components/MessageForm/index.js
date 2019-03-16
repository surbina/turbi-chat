import { connect } from 'react-redux';
import MessageForm from './Presentational';
import { postMessageToChat } from '../../actions';

const mapDispathToProps = {
  onSubmit: postMessageToChat,
};

export default connect(null, mapDispathToProps)(MessageForm);
