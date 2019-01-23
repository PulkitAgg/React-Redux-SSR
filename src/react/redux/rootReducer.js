import { combineReducers } from 'redux';

import newsReducer from './newsReducer/reducers';

export default combineReducers({
  news: newsReducer
});