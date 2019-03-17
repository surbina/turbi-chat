import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import MessageForm from './Presentational';
import { postMessage, setUserActive } from '../../actions';

const mapDispathToProps = dispatch => ({
  onSubmit: message => dispatch(postMessage(message)),
  onChange: throttle(() => dispatch(setUserActive()), 300),
});

export default connect(null, mapDispathToProps)(MessageForm);
