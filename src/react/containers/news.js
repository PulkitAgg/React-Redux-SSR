import { connect } from 'react-redux';
import NewsComponent from '../components/news/newsComponent';
import {fetchNews} from '../redux/newsReducer/actions'

const mapStateToProps = (state) => ({
    data : state.news.news,
});

const mapDispatchToProps = (dispatch) => ({
    fetchNews : () => dispatch(fetchNews())
});

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsComponent);

export default Home;