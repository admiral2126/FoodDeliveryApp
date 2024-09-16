import * as types from '../type/types';

const initialState = {
  startWorkModal: false,
  driverOnline: false,
  endWorkModal: false,
  resEndWork: {},
  allFaq: {},
  driverAmountCard: '',
  driverCardNumber: '',
  driverCardHolderName: '',
  allNotification: {},
  resStopWork: {},
  allInfoOrder: {},
  orderId: '',
  allDetailInfo: {},
  orderHistory: {},
  infoChangeAccount: false,
  startHandleSwitch: false,
  geoInfo: {},
  route: false,
  routeAddress: false,
  deviceId: '',
  resCancel: {},
  deepLink: '',
  rateOrderId: '',
  dataRate: '',
  modalRate: false,
  resWithDraw: {},
  allDetailInfoCurrentOrder: {},
  currentOrderMessage: {},
  kycLink: '',
  endOrder: {},
  orderTrigerReady: '',
  separateRestaurant: [],
  acceptOrder: false,
  driverPosition: {},
  isDriverConfirmed: { isOpenModal: true, message: '' },
};

export const MainDriverReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_START_WORK_MODAL: {
      return { ...state, startWorkModal: action.payload };
    }
    case types.SET_DRIVER_ONLINE: {
      return { ...state, driverOnline: action.payload };
    }
    case types.SET_END_WORK_MODAL: {
      return { ...state, endWorkModal: action.payload };
    }
    case types.SET_RES_END_WORK: {
      return { ...state, resEndWork: action.payload };
    }
    case types.SET_ALL_FAQ: {
      return { ...state, allFaq: action.payload };
    }
    case types.SET_DRIVER_AMOUNT_CARD: {
      return { ...state, driverAmountCard: action.payload };
    }
    case types.SET_DRIVER_CARD_NUMBER: {
      return { ...state, driverCardNumber: action.payload };
    }
    case types.SET_DRIVER_CARDHOLDER_NAME: {
      return { ...state, driverCardHolderName: action.payload };
    }
    case types.SET_ALL_NOTIFICATIONS: {
      return { ...state, allNotification: action.payload };
    }
    case types.SET_RES_STOP_WORK: {
      return { ...state, resStopWork: action.payload };
    }
    case types.SET_ALL_INFO_ORDER: {
      return { ...state, allInfoOrder: action.payload };
    }
    case types.SET_ORDER_ID: {
      return { ...state, orderId: action.payload };
    }
    case types.SET_ALL_DETAIL_INFO: {
      return { ...state, allDetailInfo: action.payload };
    }
    case types.SET_DRIVER_ORDER_HISTORY: {
      return { ...state, orderHistory: action.payload };
    }
    case types.SET_INFO_CHANGE_ACCOUNT: {
      return { ...state, infoChangeAccount: action.payload };
    }
    case types.SET_START_HANDLE_SWITCH: {
      return { ...state, startHandleSwitch: action.payload };
    }
    case types.SET_GEO_INFO: {
      return { ...state, geoInfo: action.payload };
    }
    case types.SET_NAVIGATION_ROUTE: {
      return { ...state, route: action.payload };
    }
    case types.SET_NAVIGATION_ROUTE_ADDRESS: {
      return { ...state, routeAddress: action.payload };
    }
    case types.SET_DEVICE_ID: {
      return { ...state, deviceId: action.payload };
    }
    case types.SET_RES_CANCEL_ORDER_DRIVER: {
      return { ...state, resCancel: action.payload };
    }
    case types.SET_DEEP_LINK: {
      return { ...state, deepLink: action.payload };
    }
    case types.SET_RATE_ORDER_ID: {
      return { ...state, rateOrderId: action.payload };
    }
    case types.SET_GET_DATA_RATE: {
      return { ...state, dataRate: action.payload };
    }
    case types.SET_MODAL_RATE: {
      return { ...state, modalRate: action.payload };
    }
    case types.SET_RES_WITHDRAW: {
      return { ...state, resWithDraw: action.payload };
    }
    case types.SET_ALL_DETAIL_CURRENT_ORDER: {
      return { ...state, allDetailInfoCurrentOrder: action.payload };
    }
    case types.SET_CURRENT_ORDER_MESSAGE: {
      return { ...state, currentOrderMessage: action.payload };
    }
    case types.SET_KYC_LINK: {
      return { ...state, kycLink: action.payload };
    }
    case types.SET_END_ORDER: {
      return { ...state, endOrder: action.payload };
    }
    case types.SET_TRIGER_ORDER_READY: {
      return { ...state, orderTrigerReady: action.payload };
    }
    case types.SET_SEPARATE_RESTORAN: {
      return { ...state, separateRestaurant: action.payload };
    }
    case types.SET_ACCEPT_ORDER: {
      return { ...state, acceptOrder: action.payload };
    }
    case types.SET_DRIVER_POSITION: {
      return { ...state, driverPosition: action.payload };
    }
    case types.SET_DRIVER_CONFIRMED: {
      return {
        ...state,
        isDriverConfirmed: {
          message: action.payload.message,
          isOpenModal: action.payload.success,
        },
      };
    }
    case types.SET_CLEAR_DATA_END_ORDER: {
      return initialState;
    }
    default:
      return state;
  }
};
