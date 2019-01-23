import { connect } from 'react-redux';
import HomeComponent from '../components/home/HomeComponent';

const mapStateToProps = (state) => ({
    // data : state.news.data,
    // totalCost : state.cart.totalCost,
});

const mapDispatchToProps = (dispatch) => ({
    // setCost : (cost) => dispatch(setCost(cost)),
    // setData : (data) => dispatch(setData(data)),
});

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

export default Home;