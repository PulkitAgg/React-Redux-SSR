import { connect } from 'react-redux';
import NewsComponent from '../components/news/NewsComponent';
import {fetchNews} from '../redux/actions'

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