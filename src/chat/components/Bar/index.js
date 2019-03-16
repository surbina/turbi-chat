import { connect } from 'react-redux';
import Bar from './Presentational';

const mapStateToProps = ({ login: { name } }) => ({
  userName: name,
});

export default connect(mapStateToProps)(Bar);
