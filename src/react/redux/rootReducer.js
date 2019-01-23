import { combineReducers } from 'redux';

import newsReducer from './reducers';

export default combineReducers({
  news: newsReducer
});