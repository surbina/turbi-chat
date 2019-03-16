import { connect } from 'react-redux';
import MessageForm from './Presentational';
import { postMessage } from '../../actions';

const mapDispathToProps = {
  onSubmit: postMessage,
};

export default connect(null, mapDispathToProps)(MessageForm);
