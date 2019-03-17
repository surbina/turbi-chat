import { connect } from 'react-redux';
import TypingIndicator from './Presentational';

const mapStateToProps = ({ chat: { activeUsers } }) => ({
  users: activeUsers.map(user => user.name),
});

export default connect(mapStateToProps)(TypingIndicator);
