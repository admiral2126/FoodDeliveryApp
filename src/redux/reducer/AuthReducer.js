import * as types from '../type/types';
import {paymentItem} from '../../defaultData';

const initialState = {
  userClass: '',
  phoneSignUp: '',
  resPostPhone: '',
  resPostCode: '',
  typeUser: '',
  payment: [...paymentItem],
  changeNavigation: false,
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  country: '',
  city: '',
  message: '',
  intited: '',
  resSignUpForm: '',
  allState: {},
  idState: '',
  allCity: {},
  idCity: '',
  asyncToken: '',
  asyncType: '',
  asyncRole: '',
  resProfile: {},
  resUpdate: {},
  resSwitch: {},
  allRestraunt: [],
  resRestraunt: {},
  filterButton: '',
  clearFilter: '',
  modalFullInfo: false,
  resCreateSwitch: {},
  waitSwap: false,
  stripePubKey: '',
  profileStatusCodePositive: '',
  profileStatusCodeNegative: '',
  userId: '',
  restrictedStatus: '',
  restaurantLoaded: true,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_CLASS: {
      return {...state, userClass: action.payload};
    }
    case types.SET_PHONE: {
      return {...state, phoneSignUp: action.payload};
    }
    case types.SET_RES_POST_PHONE: {
      return {...state, resPostPhone: action.payload};
    }
    case types.SET_RES_POST_CODE: {
      return {...state, resPostCode: action.payload};
    }
    case types.SET_TYPE_USER: {
      return {...state, typeUser: action.payload};
    }
    case types.SET_FIRST_NAME: {
      return {...state, firstName: action.payload};
    }
    case types.SET_LAST_NAME: {
      return {...state, lastName: action.payload};
    }
    case types.SET_DATE_OF_BIRTH: {
      return {...state, dateOfBirth: action.payload};
    }
    case types.SET_EMAIL: {
      return {...state, email: action.payload};
    }
    case types.SET_COUNTRY: {
      return {...state, country: action.payload};
    }
    case types.SET_CITY: {
      return {...state, city: action.payload};
    }
    case types.SET_MESSAGE: {
      return {...state, message: action.payload};
    }
    case types.SET_RES_POST_SIGN_UP_FORM: {
      return {...state, resSignUpForm: action.payload};
    }
    case types.SET_ALL_STATE: {
      return {...state, allState: action.payload};
    }
    case types.SET_ALL_CITY: {
      return {...state, allCity: action.payload};
    }
    case types.SET_ID_STATE: {
      return {...state, idState: action.payload};
    }
    case types.SET_CITY_ID: {
      return {...state, idCity: action.payload};
    }
    case types.SET_INITED: {
      return {...state, intited: action.payload};
    }
    case types.SET_ASYNC_TOKEN: {
      return {...state, asyncToken: action.payload};
    }
    case types.SET_ASYNC_TYPE: {
      return {...state, asyncType: action.payload};
    }
    case types.SET_ASYNC_ROLE: {
      return {...state, asyncRole: action.payload};
    }
    case types.SET_RES_PROFILE: {
      return {...state, resProfile: action.payload};
    }
    case types.SET_RES_UPDATE: {
      return {...state, resUpdate: action.payload};
    }
    case types.SET_RES_SWITCH: {
      return {...state, resSwitch: action.payload};
    }
    case types.SET_PAYMENT: {
      const title = action.payload;
      const data = state.payment.map(item => {
        if (item.title === title) {
          return {...item, selected: true};
        }
        return {...item, selected: false};
      });
      return {...state, payment: data};
    }
    case types.SET_CHANGE_NAVIGATION: {
      return {...state, changeNavigation: action.payload};
    }
    case types.SET_ALL_RESTRAUNT: {
      return {...state, allRestraunt: action.payload};
    }
    case types.SET_RES_RESTRAUNT: {
      return {...state, resRestraunt: action.payload};
    }
    case types.SET_FILTER_BUTTON: {
      return {...state, filterButton: action.payload};
    }
    case types.SET_CLEAR_FILTER: {
      return {...state, clearFilter: action.payload};
    }
    case types.SET_MODAL_FULL_INFO: {
      return {...state, modalFullInfo: action.payload};
    }
    case types.SET_RES_SWITCH_CREATE: {
      return {...state, resCreateSwitch: action.payload};
    }
    case types.SET_WAIT_SWAP: {
      return {...state, waitSwap: action.payload};
    }
    case types.SET_STRIPE_PUB_KEY: {
      return {...state, stripePubKey: action.payload};
    }
    case types.SET_RES_PRODILE_STATUS_CODE_POSITIVE: {
      return {...state, profileStatusCodePositive: action.payload};
    }
    case types.SET_RES_PRODILE_STATUS_CODE_NEGATIVE: {
      return {...state, profileStatusCodeNegative: action.payload};
    }
    case types.SET_USER_ID: {
      return {...state, userId: action.payload};
    }
    case types.SET_RESTRICTED_STATUS: {
      return {...state, restrictedStatus: action.payload};
    }
    case types.SET_RESTAURANT_LOADED: {
      return {...state, restaurantLoaded: action.payload};
    }
    default:
      return state;
  }
};
