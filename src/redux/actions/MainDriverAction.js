import * as types from '../type/types';
import {
  postStartWork,
  postStopWork,
  getAllFaq,
  postPushToken,
  getAllNotification,
  pushNotification,
  postAcceptOrder,
  postRejectOrder,
  getInfoAboutOrder,
  getCurrentOrderInfo,
  getHistoryOrderDriver,
  postGeoInfoAndTakeData,
  postCancelOrderDriver,
  postGetRateOrderItem,
  postRateOrder,
  postTakeMoney,
  postArrivedRestraunt,
  postOrderIsTaken,
  getLinkKYC,
  getPositionStatus,
  setPositionStatus,
  postOrderIsDelivered,
  postClientDidntGetInTouch,
  getRestrauntInfoForDriver,
} from '../api/AllApi';

export const setDriverOnline = online => ({
  type: types.SET_DRIVER_ONLINE,
  payload: online,
});

export const setStartWorkModal = start => ({
  type: types.SET_START_WORK_MODAL,
  payload: start,
});

export const setEndWorkModal = end => ({
  type: types.SET_END_WORK_MODAL,
  payload: end,
});

export const setResEndWork = res => ({
  type: types.SET_RES_END_WORK,
  payload: res,
});

export const setAllFaq = faq => ({
  type: types.SET_ALL_FAQ,
  payload: faq,
});

export const setDriverAmountCard = amount => ({
  type: types.SET_DRIVER_AMOUNT_CARD,
  payload: amount,
});

export const setDriverCardNumber = number => ({
  type: types.SET_DRIVER_CARD_NUMBER,
  payload: number,
});

export const setDriverCardHolderName = name => ({
  type: types.SET_DRIVER_CARDHOLDER_NAME,
  payload: name,
});

export const setAllNotifications = noti => ({
  type: types.SET_ALL_NOTIFICATIONS,
  payload: noti,
});

export const setResStopWork = work => ({
  type: types.SET_RES_STOP_WORK,
  payload: work,
});

export const setAllInfoOrder = order => ({
  type: types.SET_ALL_INFO_ORDER,
  payload: order,
});

export const setOrderId = id => ({
  type: types.SET_ORDER_ID,
  payload: id,
});

export const setAllDetailInfo = info => ({
  type: types.SET_ALL_DETAIL_INFO,
  payload: info,
});

export const setDriverOrderHistory = history => ({
  type: types.SET_DRIVER_ORDER_HISTORY,
  payload: history,
});

export const setInfoChangeAccont = info => ({
  type: types.SET_INFO_CHANGE_ACCOUNT,
  payload: info,
});

export const setStartHandleSwithc = handle => ({
  type: types.SET_START_HANDLE_SWITCH,
  payload: handle,
});

export const setGeoInfo = info => ({
  type: types.SET_GEO_INFO,
  payload: info,
});

export const setNavigationRoute = route => ({
  type: types.SET_NAVIGATION_ROUTE,
  payload: route,
});

export const setNavigationRouteAddress = route => ({
  type: types.SET_NAVIGATION_ROUTE_ADDRESS,
  payload: route,
});

export const setDeviceId = id => ({
  type: types.SET_DEVICE_ID,
  payload: id,
});

export const setResCancelOrderDriver = cancel => ({
  type: types.SET_RES_CANCEL_ORDER_DRIVER,
  payload: cancel,
});

export const setDeepLink = link => ({
  type: types.SET_DEEP_LINK,
  payload: link,
});

export const setRateOrderId = id => ({
  type: types.SET_RATE_ORDER_ID,
  payload: id,
});

export const setGetDataRate = rate => ({
  type: types.SET_GET_DATA_RATE,
  payload: rate,
});

export const setModalRate = rate => ({
  type: types.SET_MODAL_RATE,
  payload: rate,
});

export const setResWithdraw = mon => ({
  type: types.SET_RES_WITHDRAW,
  payload: mon,
});

export const setAllDetailCurrentOrder = mon => ({
  type: types.SET_ALL_DETAIL_CURRENT_ORDER,
  payload: mon,
});

export const setCurrentOrderMessage = mess => ({
  type: types.SET_CURRENT_ORDER_MESSAGE,
  payload: mess,
});

export const setKYCLink = link => ({
  type: types.SET_KYC_LINK,
  payload: link,
});

export const setEndOrder = end => ({
  type: types.SET_END_ORDER,
  payload: end,
});

export const setTrigerOrderReady = end => ({
  type: types.SET_TRIGER_ORDER_READY,
  payload: end,
});

export const setClearEndOrder = () => ({
  type: types.SET_CLEAR_DATA_END_ORDER,
});

export const setSeparateRestaurant = rest => ({
  type: types.SET_SEPARATE_RESTORAN,
  payload: rest,
});

export const setDataAcceptOrder = accept => ({
  type: types.SET_ACCEPT_ORDER,
  payload: accept,
});

export const setDriverPosition = res => ({
  type: types.SET_DRIVER_POSITION,
  payload: res,
});

export const setDriverConfirmed = value => ({
  type: types.SET_DRIVER_CONFIRMED,
  payload: value,
});

export const postDataStartWork = (data, token) => dispatch => {
  const response = postStartWork(data, token);
  response
    .then(res => {
      console.log(res, 'Post Start Work');
      dispatch(setResEndWork(res));
      dispatch(setDriverConfirmed(res));
      if (res.message === 'success') {
        dispatch(setDriverOnline(true));
      }
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Start Work');
    });
};

export const postDataStopWork = (data, token) => dispatch => {
  const response = postStopWork(data, token);
  response
    .then(res => {
      console.log(res, 'Post Stop Work');
      dispatch(setResStopWork(res));
      dispatch(res.message === 'success' && setDriverOnline(false));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Stop Work');
    });
};

export const getDataAllFaq = (data, token) => dispatch => {
  const response = getAllFaq(data, token);
  response
    .then(res => {
      console.log(res, 'Get All FAQ');
      dispatch(setAllFaq(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get All FAQ');
    });
};

export const postDataPushToken = (data, token) => dispatch => {
  const response = postPushToken(data, token);
  response
    .then(res => {
      console.log(res, 'Post FCM Token');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post FCM Token');
    });
};

export const getDataAllNotification = token => dispatch => {
  const response = getAllNotification(token);
  response
    .then(res => {
      console.log(res, 'Get All Notification');
      dispatch(setAllNotifications(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get All Notification');
    });
};

export const pushDataNotification = token => dispatch => {
  const response = pushNotification(token);
  response
    .then(res => {
      console.log(res, 'Push Noti');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Push Noti');
    });
};

//all api for use about accept, reject and get info about order

export const postDataAcceptOrder = (data, token) => dispatch => {
  const response = postAcceptOrder(data, token);
  response
    .then(res => {
      console.log(res, 'Post Accept Order');
      dispatch(setDataAcceptOrder(res.success));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Accept Order');
    });
};

export const postDataRejectOrder = (data, token) => dispatch => {
  const response = postRejectOrder(data, token);
  response
    .then(res => {
      console.log(res, 'Post Reject Order');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Reject Order');
    });
};

export const getDataCurrentOrderInfo = token => dispatch => {
  const response = getCurrentOrderInfo(token);
  response
    .then(res => {
      if (res.message === 'success') {
        dispatch(setAllDetailCurrentOrder(res));
      }
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Info About Current Order');
    });
};

export const getDataInfoAboutOrder = (data, token) => dispatch => {
  const response = getInfoAboutOrder(data, token);
  response
    .then(res => {
      console.log(res, 'Get Info About Order');
      // dispatch(res.message == 'success' && setAllDetailInfo(res));
      dispatch(setAllDetailInfo(res));
      // dispatch(getDataCurrentOrderInfo(token));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Info About Order');
    });
};

export const getDataHistoryOrderDriver = token => dispatch => {
  const response = getHistoryOrderDriver(token);
  response
    .then(res => {
      console.log(res, 'Get History Order Driver');
      dispatch(setDriverOrderHistory(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get History Order Driver');
    });
};

export const postDataGeoInfoAndTakeData = (data, token) => dispatch => {
  const response = postGeoInfoAndTakeData(data, token);
  response
    .then(res => {
      console.log(res, 'Get Geo Info');
      dispatch(setGeoInfo(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Geo Info');
    });
};

export const postDataCancelOrderDriver = token => dispatch => {
  const response = postCancelOrderDriver(token);
  response
    .then(res => {
      console.log(res, 'Post Cancel Order');
      dispatch(setResCancelOrderDriver(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Cancel Order');
    });
};

export const postDataGetRateOrderItem = (data, token) => dispatch => {
  const response = postGetRateOrderItem(data, token);
  response
    .then(res => {
      console.log(res, 'Get Rate Info');
      dispatch(setGetDataRate(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Rate Info');
    });
};

export const postDataRateOrder = (data, token) => dispatch => {
  const response = postRateOrder(data, token);
  response
    .then(res => {
      console.log(res, 'Post Rate');
      dispatch(setGetDataRate(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Rate');
    });
};

export const postDataTakeMoney = (data, token) => dispatch => {
  const response = postTakeMoney(data, token);
  response
    .then(res => {
      console.log(res, 'Post Take Money');
      dispatch(setResWithdraw(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Take Money');
    });
};

export const postDataArrivedRestraunt = (data, token) => dispatch => {
  const response = postArrivedRestraunt(data, token);
  response
    .then(res => {
      console.log(res, 'Post Arrived To The Restraunt');
      dispatch(setCurrentOrderMessage(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Arrived To The Restraunt');
    });
};

export const postDataOrderIsTaken = (data, token) => dispatch => {
  const response = postOrderIsTaken(data, token);
  response
    .then(res => {
      console.log(res, 'Post Order Is Taken');
      dispatch(setCurrentOrderMessage(res));
      dispatch(getDataCurrentOrderInfo(token));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Order Is Taken');
    });
};

export const getDataLinkKYC = token => dispatch => {
  const response = getLinkKYC(token);
  response
    .then(res => {
      console.log(res, 'Get Data Link KYC');
      dispatch(setKYCLink(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Data Link KYC');
    });
};

export const getDataPositionStatus = token => dispatch => {
  const response = getPositionStatus(token);
  response
    .then(res => {
      console.log(res, 'Get Position Status');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Position Status');
    });
};

export const setDataPositionStatus = (token, body) => dispatch => {
  dispatch(setDriverPosition(body));
  const response = setPositionStatus(token, body);
  response
    .then(res => {
      console.log(res, 'Set Position Status');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Set Position Status');
    });
};

export const postDataOrderIsDelivered = token => dispatch => {
  const response = postOrderIsDelivered(token);
  response
    .then(res => {
      console.log(res, 'Post Order Is Delivered');
      dispatch(setEndOrder(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Order Is Delivered');
    });
};

export const postDataClientDidntGetInTouch = token => dispatch => {
  const response = postClientDidntGetInTouch(token);
  response
    .then(res => {
      console.log(res, 'Post Client Didnt Get In Touch');
      dispatch(setEndOrder(res));
    })
    .catch(err => {
      console.log(
        err,
        'Something went wrong in Post Client Didnt Get In Touch',
      );
    });
};

export const getDataRestrauntInfoForDriver = (token, data) => dispatch => {
  const response = getRestrauntInfoForDriver(token, data);
  response
    .then(res => {
      console.log(res, 'Get Restraunt Info For Driver');
      dispatch(setSeparateRestaurant(res.data.supplier));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Restraunt Info For Driver');
    });
};
