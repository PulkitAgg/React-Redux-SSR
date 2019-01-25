import { FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE, HIDE_LOADER, SHOW_LOADER } from './constant';
import "isomorphic-fetch";
import URLS from "../../common/api";

// Action Creators
const showLoader = () => ({ type: SHOW_LOADER });
const hideLoader = () => ({ type: HIDE_LOADER });
const receivedNews = news => ({ type: FETCH_NEWS_SUCCESS, payload: news });
const newsError = () => ({ type: FETCH_NEWS_FAILURE });

export const fetchNews = () => (dispatch, getState) => {
  dispatch(showLoader());
  return fetch(URLS.news)
    .then(news => {
      dispatch(hideLoader());
      dispatch(receivedNews(news))
    })
    .catch(err =>{
      dispatch(hideLoader());
      dispatch(newsError(err))
    })
};