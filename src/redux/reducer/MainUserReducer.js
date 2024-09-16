import * as types from '../type/types';
import { deliveryType } from '../../defaultData';
import { stat } from '@babel/core/lib/gensync-utils/fs';

const initialState = {
  address: [],
  singleRestraunt: {},
  singleAddress: '',
  likeMenuItem: '',
  allMenuItem: {},
  likeItem: [],
  openModal: false,
  itemMenuByCategore: {},
  fullRestrauntInfo: {},
  allFavorites: {},
  numberOfFood: 0,
  resPromo: {},
  promoCode: '',
  resFav: '',
  allCartItem: [],
  resSetInCart: {},
  resGetCart: {},
  categoryIds: [],
  sum: '',
  load: false,
  allOrders: {},
  resProceedOrder: {},
  deliceryType: [...deliveryType],
  cardNumber: '',
  cardHolderName: '',
  expiryDate: '',
  cvvCode: '',
  saveCard: false,
  resAddCard: '',
  creditCardList: [],
  addressCity: '',
  addressStreetName: '',
  addressAppartment: '',
  addressComment: '',
  resAddDeliveryAddress: {},
  resDeliveryTime: {},
  resConfirm: {},
  resSimpleOrder: {},
  resCancelOrder: {},
  oneTimeCard: '',
  finallyDeliveryTime: '',
  fullAddAddress: '',
  cardName: '',
  resDeleteCard: {},
  resDefaultCard: {},
  resListDefCard: {},
  payName: '',
  contact: false,
  resLastOrder: [],
  addressLabel: '',
  resDeleteAddress: {},
  modalHeaderNav: false,
  resDefAddress: {},
  infoOneAddress: {},
  resUpdate: {},
  resOneTimeAddress: {},
  confirmOrderPay: {},
  totalPrices: {
    itemsSubtotal: 0,
    totalPriceFee: 0,
    deliveryPriceFee: 0,
    delivery: 0,
    total: 0,
    isFreeDelivery: false,
    deliveryDistanceValue: 0,
    deliveryDistanceType: '',
  },
  deliveryTrackTime: {
    allSuppliersHaveConfirmedAt: '',
    expectedDeliveryTime: '',
  },
};

export const MainUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LIST_ADDRESS: {
      return { ...state, address: action.payload };
    }
    case types.SET_SINGLE_RESTRAUNT: {
      return { ...state, singleRestraunt: action.payload };
    }
    case types.SET_ADDRESS: {
      return { ...state, singleAddress: action.payload };
    }
    case types.SET_LIKE_MENU_ITEM: {
      return { ...state, likeMenuItem: action.payload };
    }
    case types.SET_MENU_ITEM_FROM_RES: {
      return { ...state, allMenuItem: action.payload };
    }
    case types.SET_LIKE_ITEM: {
      return { ...state, likeItem: action.payload };
    }
    case types.SET_OPEN_MODAL: {
      return { ...state, openModal: action.payload };
    }
    case types.SET_ITEM_MENU_BY_CATEGORY: {
      return { ...state, itemMenuByCategore: action.payload };
    }
    case types.SET_FULL_RESTRAUNT_INFO: {
      return { ...state, fullRestrauntInfo: action.payload };
    }
    case types.SET_ALL_FAVORITES: {
      return { ...state, allFavorites: action.payload };
    }
    case types.SET_DELETE_ITEM_FROM_MAIN_FAVORITES: {
      const { restId, categoryId, itemId } = action.payload;
      let allFavCopy = state.allFavorites.rows.map(rest => {
        if (rest.id === restId) {
          rest.MenuCategories = rest.MenuCategories.map(category => {
            if (category.id === categoryId) {
              category.MenuItems = category.MenuItems.filter(
                item => item.id !== itemId,
              );
            }
            return category;
          });
          return rest;
        }
        return rest;
      });
      const finishCopy = state.allFavorites;
      finishCopy.rows = allFavCopy;
      return { ...state, allFavorites: finishCopy };
    }
    case types.SET_RESPONSE_FAV: {
      return { ...state, resFav: action.payload };
    }
    case types.SET_NUMBER_OF_FOOD: {
      return { ...state, numberOfFood: action.payload };
    }
    case types.SET_RES_PROMO: {
      return { ...state, resPromo: action.payload };
    }
    case types.SET_PROMO_CODE: {
      return { ...state, promoCode: action.payload };
    }
    case types.SET_ALL_CART_ITEM: {
      return { ...state, allCartItem: action.payload };
    }
    case types.SET_RES_SET_IN_CART: {
      return { ...state, resSetInCart: action.payload };
    }
    case types.SET_RES_GET_CART: {
      return { ...state, resGetCart: action.payload };
    }
    case types.SET_CATEGORY_IDS: {
      return { ...state, categoryIds: action.payload };
    }
    case types.SET_FULL_SUM: {
      return { ...state, sum: action.payload };
    }
    case types.SET_CART_LOAD: {
      return { ...state, load: action.payload };
    }
    case types.SET_ALL_ORDERS: {
      return { ...state, allOrders: action.payload };
    }
    case types.SET_RES_PROCEED_ORDER: {
      return { ...state, resProceedOrder: action.payload };
    }
    case types.SET_DELIVERY_TYPE: {
      const title = action.payload;
      const data = state.deliceryType.map(item => {
        if (item.title === title) {
          return { ...item, selected: true };
        }
        return { ...item, selected: false };
      });
      return { ...state, deliceryType: data };
    }
    case types.SET_CARD_NUMBER: {
      return { ...state, cardNumber: action.payload };
    }
    case types.SET_CARD_HOLDER_NAME: {
      return { ...state, cardHolderName: action.payload };
    }
    case types.SET_EXPIRY_DATE: {
      return { ...state, expiryDate: action.payload };
    }
    case types.SET_CVV: {
      return { ...state, cvvCode: action.payload };
    }
    case types.SET_SAVE_CARD: {
      return { ...state, saveCard: action.payload };
    }
    case types.SET_RES_ADD_CARD: {
      return { ...state, resAddCard: action.payload };
    }
    case types.SET_LIST_CREDIT_CARD: {
      return { ...state, creditCardList: action.payload };
    }
    case types.SET_ADDRESS_CITY: {
      return { ...state, addressCity: action.payload };
    }
    case types.SET_ADDRESS_STREET_NAME: {
      return { ...state, addressStreetName: action.payload };
    }
    case types.SET_ADDRESS_APPARTMENT: {
      return { ...state, addressAppartment: action.payload };
    }
    case types.SET_ADDRESS_COMMENT: {
      return { ...state, addressComment: action.payload };
    }
    case types.SET_RES_ADD_ADDRESS_DELIVERY: {
      return { ...state, resAddDeliveryAddress: action.payload };
    }
    case types.SET_RES_DELIVERY_TIME: {
      return { ...state, resDeliveryTime: action.payload };
    }
    case types.SET_RES_CONFIRM_ORDER: {
      return { ...state, resConfirm: action.payload };
    }
    case types.SET_RES_DATA_SIMPLE_ORDER: {
      return { ...state, resSimpleOrder: action.payload };
    }
    case types.SET_RES_CANCEL_ORDER: {
      return { ...state, resCancelOrder: action.payload };
    }
    case types.SET_ONE_TIME_CARD: {
      return { ...state, oneTimeCard: action.payload };
    }
    case types.SET_FINALLY_DELIVERY_TIME: {
      return { ...state, finallyDeliveryTime: action.payload };
    }
    case types.SET_FULL_ADD_ADDRESS: {
      return { ...state, fullAddAddress: action.payload };
    }
    case types.SET_CARD_NAME: {
      return { ...state, cardName: action.payload };
    }
    case types.SET_RES_DELETE_CARD: {
      return { ...state, resDeleteCard: action.payload };
    }
    case types.SET_RES_DEFAUL_CARD: {
      return { ...state, resDefaultCard: action.payload };
    }
    case types.SET_RES_LIST_DEFAULT_CARD: {
      return { ...state, resListDefCard: action.payload };
    }
    case types.SET_PAY_NAME: {
      return { ...state, payName: action.payload };
    }
    case types.SET_VISIBLE_CONTACT: {
      return { ...state, contact: action.payload };
    }
    case types.SET_RES_LAST_ORDER: {
      return { ...state, resLastOrder: action.payload };
    }
    case types.SET_ADDRESS_LABEL: {
      return { ...state, addressLabel: action.payload };
    }
    case types.SET_RES_DELETE_ADDRESS: {
      return { ...state, resDeleteAddress: action.payload };
    }
    case types.SET_MODAL_HEADER_NAV: {
      return { ...state, modalHeaderNav: action.payload };
    }
    case types.SET_RES_DEFAULT_ADDRESS: {
      return { ...state, resDefAddress: action.payload };
    }
    case types.SET_INFO_ONE_ADDRESS: {
      return { ...state, infoOneAddress: action.payload };
    }
    case types.SET_RES_ADDRESS_UPDATE: {
      return { ...state, resUpdate: action.payload };
    }
    case types.SET_RES_ONE_TIME_ADDRESS: {
      return { ...state, resOneTimeAddress: action.payload };
    }
    case types.SET_CONFIRM_ORDER_PAY: {
      return { ...state, confirmOrderPay: action.payload };
    }
    case types.SET_TOTAL_PRICES: {
      return {
        ...state,
        totalPrices: {
          itemsSubtotal: action.payload.totalPrice,
          totalPriceFee: action.payload.totalPriceFee,
          deliveryPriceFee: action.payload.deliveryPriceFee,
          delivery: action.payload.deliveryPrice,
          total: action.payload.finalPrice,
          isFreeDelivery: action.payload.isFreeDelivery,
          deliveryDistanceValue: action.payload.deliveryDistanceValue,
          deliveryDistanceType: action.payload.deliveryDistanceType,
        },
      };
    }
    case types.SET_DELIVERY_TRACK_TIME: {
      return {
        ...state,
        deliveryTrackTime: {
          allSuppliersHaveConfirmedAt:
            action.payload.allSuppliersHaveConfirmedAt,
          expectedDeliveryTime: action.payload.expectedDeliveryTime,
        },
      };
    }
    case types.SET_ORDER_STATUS: {
      return {
        ...state,
        resSimpleOrder: {
          ...state.resSimpleOrder,
          allSuppliersHaveConfirmed: action.payload,
        },
      };
    }
    case types.SET_ORDER_DELIVERY_TRACK_TIME: {
      return {
        ...state,
        deliveryTrackTime: {
          ...state.deliveryTrackTime,
          expectedDeliveryTime: action.payload,
        },
      };
    }
    case types.SET_ORDER_COURIER: {
      return {
        ...state,
        resSimpleOrder: {
          ...state.resSimpleOrder,
          Courier: action.payload,
        },
      };
    }
    case types.SET_CLEAR_ALL_MAIN: {
      return initialState;
    }
    default:
      return state;
  }
};
