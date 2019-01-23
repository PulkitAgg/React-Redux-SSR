import { FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE, HIDE_LOADER, SHOW_LOADER } from './constant';


// type StateType = {
//   news : Array
//   // totalCost: Number,
//   // promoCodeList:Array,
//   // noOfItems :Array,
//   // appliedPromocode: String
// };

const initialState = {
  news : [],
  isFetching: false,
  // totalCost: 0,
  // promoCodeList:[],
  // appliedPromoCode:''
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



// import { REQUEST_APPS,  RECEIVE_APPS } from './actions';

// function apps( state = {isFetching: false, apps: []}, action) {
//   switch (action.type) {
//     case REQUEST_APPS:
//       return Object.assign({}, state, {
//         isFetching: true
//       });
//     case RECEIVE_APPS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         apps: action.apps
//       });
//     default:
//       return state
//   }
// }

// export default apps


