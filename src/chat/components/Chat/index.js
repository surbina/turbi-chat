import { connect } from 'react-redux';
import Chat from './Presentational';
import { selectors } from '../../../login';

const mapStateToProps = state => ({
  isUserLogged: selectors.isUserLogged(state),
});

export default connect(mapStateToProps)(Chat);
