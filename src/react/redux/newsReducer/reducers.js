import { FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE, HIDE_LOADER, SHOW_LOADER } from './constant';

const initialState = {
  news : [],
  isFetching: false,
};


const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
    return {
      ...state,
      isFetching: true
    };
    case HIDE_LOADER:
    return {
      ...state,
      isFetching: false
    };
    case FETCH_NEWS_SUCCESS:
    return {
      ...state,
      news: action.payload
    };
    case FETCH_NEWS_FAILURE:
    return {
      ...state,
      news: []
    };
    default:
      return state;
  }
};

export default newsReducer;
