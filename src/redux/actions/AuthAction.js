import AsyncStorage from '@react-native-async-storage/async-storage';
import * as types from '../type/types';
import {
  postPhoneNumber,
  postVerifyCode,
  postSignUpClient,
  postSignUpCourier,
  getAllState,
  getAllCity,
  getProfile,
  postSignUpUpdate,
  postSwitchAccount,
  postSwitchCreateDriver,
  postAboutRestaurants,
  getAllRestraunt,
  getMyRoleAccount,
  getStripePubKey,
  getRestrictedStatus,
  logOut,
} from '../api/AllApi';
import { setClearAllMain } from './MainUserAction';
import { setClearEndOrder } from './MainDriverAction';

export const setUserClass = user => ({
  type: types.SET_USER_CLASS,
  payload: user,
});

export const setPhoneSignUp = phone => ({
  type: types.SET_PHONE,
  payload: phone,
});

export const setResSwitchCreate = res => ({
  type: types.SET_RES_SWITCH_CREATE,
  payload: res,
});

export const setWaitSwap = swap => ({
  type: types.SET_WAIT_SWAP,
  payload: swap,
});

export const setResPostPhone = res => ({
  type: types.SET_RES_POST_PHONE,
  payload: res,
});

export const setResPostCode = res => ({
  type: types.SET_RES_POST_CODE,
  payload: res,
});

export const setTypeUser = type => ({
  type: types.SET_TYPE_USER,
  payload: type,
});

export const setFirstName = name => ({
  type: types.SET_FIRST_NAME,
  payload: name,
});

export const setLastName = last => ({
  type: types.SET_LAST_NAME,
  payload: last,
});

export const setDateOfBirth = date => ({
  type: types.SET_DATE_OF_BIRTH,
  payload: date,
});

export const setEmail = email => ({
  type: types.SET_EMAIL,
  payload: email,
});

export const setCountry = country => ({
  type: types.SET_COUNTRY,
  payload: country,
});

export const setCity = city => ({
  type: types.SET_CITY,
  payload: city,
});

export const setMessage = message => ({
  type: types.SET_MESSAGE,
  payload: message,
});

export const setResSignUpForm = res => ({
  type: types.SET_RES_POST_SIGN_UP_FORM,
  payload: res,
});

export const setAllState = state => ({
  type: types.SET_ALL_STATE,
  payload: state,
});

export const setAllCity = city => ({
  type: types.SET_ALL_CITY,
  payload: city,
});

export const setIdState = state => ({
  type: types.SET_ID_STATE,
  payload: state,
});

export const setCityId = city => ({
  type: types.SET_CITY_ID,
  payload: city,
});

export const setIntited = intited => ({
  type: types.SET_INITED,
  payload: intited,
});

export const setAsyncToken = token => ({
  type: types.SET_ASYNC_TOKEN,
  payload: token,
});

export const setAsyncType = type => ({
  type: types.SET_ASYNC_TYPE,
  payload: type,
});

export const setAsyncRole = role => ({
  type: types.SET_ASYNC_ROLE,
  payload: role,
});

export const setPayment = payment => ({
  type: types.SET_PAYMENT,
  payload: payment,
});

export const setChangeNavigation = payment => ({
  type: types.SET_CHANGE_NAVIGATION,
  payload: payment,
});

export const setResProfile = profile => ({
  type: types.SET_RES_PROFILE,
  payload: profile,
});

export const setResUpdate = res => ({
  type: types.SET_RES_UPDATE,
  payload: res,
});

export const setResSwitch = res => ({
  type: types.SET_RES_SWITCH,
  payload: res,
});

export const setAllRestraunt = res => ({
  type: types.SET_ALL_RESTRAUNT,
  payload: res,
});

export const setResRestraunt = res => ({
  type: types.SET_RES_RESTRAUNT,
  payload: res,
});

export const setFilterButton = button => ({
  type: types.SET_FILTER_BUTTON,
  payload: button,
});

export const setClearFilter = filter => ({
  type: types.SET_CLEAR_FILTER,
  payload: filter,
});

export const setModalFullInfo = modal => ({
  type: types.SET_MODAL_FULL_INFO,
  payload: modal,
});

export const setStripePubKey = key => ({
  type: types.SET_STRIPE_PUB_KEY,
  payload: key,
});

export const setProfileStatusCodePositive = code => ({
  type: types.SET_RES_PRODILE_STATUS_CODE_POSITIVE,
  payload: code,
});

export const setProfileStatusCodeNegative = code => ({
  type: types.SET_RES_PRODILE_STATUS_CODE_NEGATIVE,
  payload: code,
});

export const setUserId = id => ({
  type: types.SET_USER_ID,
  payload: id,
});

export const setRestrictedStatus = status => ({
  type: types.SET_RESTRICTED_STATUS,
  payload: status,
});

export const setRestaurantLoaded = loaded => ({
  type: types.SET_RESTAURANT_LOADED,
  payload: loaded,
});

export const postDataPhoneNumber = data => dispatch => {
  const response = postPhoneNumber(data);
  response
    .then(res => {
      console.log(res, 'Send Phone');
      dispatch(setResPostPhone(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Send Phone');
    });
};

export const postDataVerifyCode = data => dispatch => {
  const response = postVerifyCode(data);
  response
    .then(res => {
      console.log(res, 'Send Code');
      dispatch(setResPostCode(res));
      if (res.success && res.data) {
        dispatch(setAsyncRole(res.data.role));
        dispatch(setAsyncToken(res.data.token));
        dispatch(setTypeUser(res.data.isNewUser));
        dispatch(setIntited(res.data.isCourierInited));
        dispatch(setAsyncType(String(res.data.isNewUser)));
        dispatch(setUserId(res.data.userId));
        AsyncStorage.setItem('access_token', res.data.token);
        AsyncStorage.setItem('isNewUser', String(res.data.isNewUser));
        AsyncStorage.setItem('role', res.data.role);
        AsyncStorage.setItem('userID', String(res.data.userId));
      }
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Send Code');
    });
};

export const postDataSignUpClient = (data, token) => dispatch => {
  const response = postSignUpClient(data, token);
  response
    .then(res => {
      console.log(res, 'Send Sign up Client');
      dispatch(setResSignUpForm(res));
      dispatch(setMessage(res.message));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Send Sign up Client');
    });
};

export const postDataSignUpCourier = (data, token) => dispatch => {
  const response = postSignUpCourier(data, token);
  response
    .then(res => {
      console.log(res, 'Send Sign up Courier');
      dispatch(setResSignUpForm(res));
      dispatch(setMessage(res.message));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Send Sign up Courier');
    });
};

export const getDataAllState = data => dispatch => {
  const response = getAllState(data);
  response
    .then(res => {
      console.log(res, 'Get all State');
      dispatch(setAllState(res.data.rows));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get all State');
    });
};

export const getDataAllCity = data => dispatch => {
  const response = getAllCity(data);
  response
    .then(res => {
      console.log(res, 'Get City Data');
      dispatch(setAllCity(res.data.rows));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get City Data');
    });
};

export const getDataProfile = (token, role) => dispatch => {
  const response = getProfile(token, role);
  response
    .then(res => {
      console.log(res, 'Get Profile Data');
      dispatch(setResProfile(res.data));
      if (res.statusCode === 200) {
        dispatch(setProfileStatusCodePositive(res.statusCode));
      } else if (
        res.statusCode === 401 ||
        res.statusCode === 402 ||
        res.statusCode === 403
      ) {
        dispatch(setProfileStatusCodeNegative(res.statusCode));
      }
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Profile Data');
      return { name: 'network error', description: '' };
    });
};

export const postDataSignUpUpdate = (data, token, role) => dispatch => {
  const response = postSignUpUpdate(data, token, role);
  response
    .then(res => {
      console.log(res, 'Send Update Profile');
      dispatch(setResUpdate(res));
      dispatch(setMessage(res.message));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Send Update Profile');
    });
};

export const postDataSwitchAccount = (data, token) => dispatch => {
  const response = postSwitchAccount(data, token);
  response
    .then(res => {
      console.log(res, 'Send Switch Account');
      dispatch(setResSwitch(res));
      dispatch(setAsyncRole(res.data.type));
      AsyncStorage.setItem('role', res.data.type);
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Send Switch Account');
    });
};

export const postDataSwitchCreateDriver = token => dispatch => {
  const response = postSwitchCreateDriver(token);
  response
    .then(res => {
      console.log(res, 'Send Switch Create Driver Account');
      dispatch(setResSwitchCreate(res));
    })
    .catch(err => {
      console.log(
        err,
        'Something went wrong in Send Switch Create Driver Account',
      );
    });
};

export const getDataAllRestraunt = (data, token) => dispatch => {
  const response = getAllRestraunt(data, token);
  response
    .then(res => {
      console.log(res, 'Get Restraunt');
      dispatch(setAllRestraunt(res.data.rows));
      dispatch(setResRestraunt(res));
      dispatch(setRestaurantLoaded(true));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Restraunt');
      dispatch(setRestaurantLoaded(true));
    });
};

export const postDataAboutRestaurants = (data, token) => dispatch => {
  const response = postAboutRestaurants(data, token);
  response
    .then(res => {
      console.log(res, 'Send Restraunt');
      dispatch(setAllRestraunt(res.data.rows));
      dispatch(setResRestraunt(res));
      dispatch(setRestaurantLoaded(true));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Send Restraunt');
      dispatch(setRestaurantLoaded(true));
    });
};

export const getDataMyRoleAccount = token => dispatch => {
  const response = getMyRoleAccount(token);
  response
    .then(res => {
      console.log(res, 'Get My Role');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get My Role');
    });
};

export const getDataStripePubKey = () => dispatch => {
  const response = getStripePubKey();
  response
    .then(res => {
      console.log(res, 'Get My Stripe Key');
      dispatch(setStripePubKey(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get My Stripe Key');
    });
};

export const getDataRestrictedStatus = data => dispatch => {
  console.log(data, 'dataRest');
  const response = getRestrictedStatus(data);
  response
    .then(res => {
      console.log(res, 'Get Restricted Status');
      dispatch(setRestrictedStatus(res.success));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Restricted Status');
    });
};

export const userLogOut = (token, role) => dispatch => {
  const response = logOut(token);

  response
    .then(res => {
      if (role === 'client') {
        dispatch(setClearAllMain());
      }
      if (role === 'courier') {
        dispatch(setClearEndOrder());
      }
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Logout');
    });
};
