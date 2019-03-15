import { connect } from 'react-redux';
import Form from './Presentational';
import { setUserName } from '../../actions';

const mapDispatchToProps = {
  // on submit should also redirect to chat
  onSubmit: setUserName,
};

export default connect(null, mapDispatchToProps)(Form);
