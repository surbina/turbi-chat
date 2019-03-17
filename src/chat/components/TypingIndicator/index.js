import { connect } from 'react-redux';
import TypingIndicator from './Presentational';

const mapStateToProps = ({ chat: { activeUsers } }) => ({
  users: Object.values(activeUsers).map(user => user.name),
});

export default connect(mapStateToProps)(TypingIndicator);
