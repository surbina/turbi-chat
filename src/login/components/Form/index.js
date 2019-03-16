import { connect } from 'react-redux';
import Form from './Presentational';
import { setUserName } from '../../actions';
import { selectors } from '../../reducer';

const mapStateToProps = state => ({
  isUserLogged: selectors.isUserLogged(state),
});

const mapDispatchToProps = {
  onSubmit: setUserName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
