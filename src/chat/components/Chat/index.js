import { connect } from 'react-redux';
import Chat from './Presentational';
import { subscribeToChat, unsubscribeFromChat } from '../../actions';
import { selectors } from '../../../login';

const mapStateToProps = state => ({
  isUserLogged: selectors.isUserLogged(state),
});

const mapDispatchToProps = {
  subscribeToChat,
  unsubscribeFromChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
