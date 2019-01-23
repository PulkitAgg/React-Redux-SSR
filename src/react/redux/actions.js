import {  FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE, HIDE_LOADER, SHOW_LOADER } from './constant';
import "isomorphic-fetch";


// Action Creators
// const requestNews = () => ({ type: FETCH_NEWS_REQUEST });
const showLoader = () => ({ type: SHOW_LOADER });
const hideLoader = () => ({ type: HIDE_LOADER });

const receivedNews = news => ({ type: FETCH_NEWS_SUCCESS, payload: news });
const newsError = () => ({ type: FETCH_NEWS_FAILURE });

export const fetchNews = () => (dispatch, getState) => {
  dispatch(showLoader());
  return fetch("http://localhost:3000/api/news")
    .then(response => response.json())
    .then(news => {
      dispatch(hideLoader());
      dispatch(receivedNews(news))
    })
    .catch(err =>{
      dispatch(hideLoader());
      dispatch(newsError(err))
    })
};




// export const setData = (data) => (dispatch: any) => {
//   dispatch({
//     type: SET_DATA,
//     data: data
//   });
// }

// export const applyPromocode = (promocode) => (dispatch: any) => {
//   dispatch({
//     type: SET_PROMOCODE,
//     data: promocode
//   });
// }





// Reducer
// export default function reducer(state = {}, action) {
//   switch (action.type) {
//     case FETCH_NEWS_SUCCESS:
//       return { ...state, news: action.payload };

//     default:
//       return state;
//   }
// }




// export const REQUEST_APPS = 'REQUEST_APPS'
// export const RECEIVE_APPS = 'RECEIVE_APPS'



// function requestApps() {
//   return {
//     type: REQUEST_APPS
//   }
// }

// function receiveApps(json) {
//   return {
//     type: RECEIVE_APPS,
//     apps: json
//   }
// }

// function fetchApps() {
//   return dispatch => {
//     dispatch(requestApps())
//     return fetch(`assets/data.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receiveApps(json)))
//   }
// }

// function shouldFetchApps(state) {
//   const apps = state.apps
//   if (apps.length==0) {
//     return true
//   } else if (state.isFetching) {
//     return false
//   }
// }

// export function fetchAppsIfNeeded() {
//   return (dispatch, getState) => {
//     if (shouldFetchApps(getState())) {
//       return dispatch(fetchApps())
//     }
//   }
// }
