import * as types from '../type/types';
import {
  getAddressList,
  getAllMenuItemByRestraunt,
  getMenuItemForCategory,
  getFullRestrauntInfo,
  postAddFavoriteItem,
  postRemoveFavoriteItem,
  getAllFavoritesItem,
  postPromoCode,
  postDeleteItemMenuInCart,
  getAllCart,
  postDeleteAllItemFromCart,
  postSetItemMenuInCart,
  getAllOrders,
  postProceedOrder,
  postDeliveryType,
  postDeliveryAddress,
  postDeliveryPaymentType,
  postAddCardInOrder,
  getListAllCreditCard,
  postAddressDetails,
  postDeliveryTime,
  postConfirmOrder,
  postSimpleOrderInfo,
  postCancelOrder,
  postDeleteCreditCard,
  postPaySettingsUpdate,
  getAllDefaultCardInfo,
  getInfoLastOrder,
  postDeleteAddress,
  postSetDefaultAddress,
  getOneAddressInfo,
  postUpdateAddress,
} from '../api/AllApi';

export const setListAddress = address => ({
  type: types.SET_LIST_ADDRESS,
  payload: address,
});

export const setSingleRestraunt = info => ({
  type: types.SET_SINGLE_RESTRAUNT,
  payload: info,
});

export const setAddress = address => ({
  type: types.SET_ADDRESS,
  payload: address,
});

export const setLikeMenuItem = item => ({
  type: types.SET_LIKE_MENU_ITEM,
  payload: item,
});

export const setAllMenuItem = item => ({
  type: types.SET_MENU_ITEM_FROM_RES,
  payload: item,
});

export const setLikeItem = item => ({
  type: types.SET_LIKE_ITEM,
  payload: item,
});

export const setOpenModal = open => ({
  type: types.SET_OPEN_MODAL,
  payload: open,
});

export const setItemMenuByCategory = category => ({
  type: types.SET_ITEM_MENU_BY_CATEGORY,
  payload: category,
});

export const setFullRestrauntInfo = info => ({
  type: types.SET_FULL_RESTRAUNT_INFO,
  payload: info,
});

export const setAllFavorites = fav => ({
  type: types.SET_ALL_FAVORITES,
  payload: fav,
});

export const setNumberOfFood = num => ({
  type: types.SET_NUMBER_OF_FOOD,
  payload: num,
});

export const setResPromo = res => ({
  type: types.SET_RES_PROMO,
  payload: res,
});

export const setPromoCode = promo => ({
  type: types.SET_PROMO_CODE,
  payload: promo,
});

export const setDeleteFavMain = (restId, categoryId, itemId) => ({
  type: types.SET_DELETE_ITEM_FROM_MAIN_FAVORITES,
  payload: { restId: restId, categoryId: categoryId, itemId: itemId },
});

export const setResponseFav = res => ({
  type: types.SET_RESPONSE_FAV,
  payload: res,
});

export const setAllCartItem = item => ({
  type: types.SET_ALL_CART_ITEM,
  payload: item,
});

export const setResSetInCart = res => ({
  type: types.SET_RES_SET_IN_CART,
  payload: res,
});

export const setResGetCart = res => ({
  type: types.SET_RES_GET_CART,
  payload: res,
});

export const setCategoryIds = ids => ({
  type: types.SET_CATEGORY_IDS,
  payload: ids,
});

export const setFullSum = sum => ({
  type: types.SET_FULL_SUM,
  payload: sum,
});

export const setCartLoad = load => ({
  type: types.SET_CART_LOAD,
  payload: load,
});

export const setAllOrders = order => ({
  type: types.SET_ALL_ORDERS,
  payload: order,
});

export const setResProceedOrder = res => ({
  type: types.SET_RES_PROCEED_ORDER,
  payload: res,
});

export const setDeliveryType = type => ({
  type: types.SET_DELIVERY_TYPE,
  payload: type,
});

export const setCardNumber = number => ({
  type: types.SET_CARD_NUMBER,
  payload: number,
});

export const setCardHolder = holder => ({
  type: types.SET_CARD_HOLDER_NAME,
  payload: holder,
});

export const setExpiryDate = date => ({
  type: types.SET_EXPIRY_DATE,
  payload: date,
});

export const setCvv = cvv => ({
  type: types.SET_CVV,
  payload: cvv,
});

export const setSaveCard = save => ({
  type: types.SET_SAVE_CARD,
  payload: save,
});

export const setResAddCard = res => ({
  type: types.SET_RES_ADD_CARD,
  payload: res,
});

export const setListCreditCard = card => ({
  type: types.SET_LIST_CREDIT_CARD,
  payload: card,
});

export const setAddressCity = city => ({
  type: types.SET_ADDRESS_CITY,
  payload: city,
});

export const setAddressStreetName = name => ({
  type: types.SET_ADDRESS_STREET_NAME,
  payload: name,
});

export const setAddressAppartment = appart => ({
  type: types.SET_ADDRESS_APPARTMENT,
  payload: appart,
});

export const setAddressComment = comment => ({
  type: types.SET_ADDRESS_COMMENT,
  payload: comment,
});

export const setResAddDeliverAddress = address => ({
  type: types.SET_RES_ADD_ADDRESS_DELIVERY,
  payload: address,
});

export const setResDeliveryTime = res => ({
  type: types.SET_RES_DELIVERY_TIME,
  payload: res,
});

export const setResConfirmOrder = res => ({
  type: types.SET_RES_CONFIRM_ORDER,
  payload: res,
});

export const setResDataSimplOrder = res => ({
  type: types.SET_RES_DATA_SIMPLE_ORDER,
  payload: res,
});

export const setResCancelOrder = res => ({
  type: types.SET_RES_CANCEL_ORDER,
  payload: res,
});

export const setOneTimeCard = card => ({
  type: types.SET_ONE_TIME_CARD,
  payload: card,
});

export const setFinallyDeliveryTime = time => ({
  type: types.SET_FINALLY_DELIVERY_TIME,
  payload: time,
});

export const setFullAddAddress = time => ({
  type: types.SET_FULL_ADD_ADDRESS,
  payload: time,
});

export const setCardName = name => ({
  type: types.SET_CARD_NAME,
  payload: name,
});

export const setClearAllMain = () => ({
  type: types.SET_CLEAR_ALL_MAIN,
});

export const setResDeleteCard = res => ({
  type: types.SET_RES_DELETE_CARD,
  payload: res,
});

export const setResDefaultCard = res => ({
  type: types.SET_RES_DEFAUL_CARD,
  payload: res,
});

export const setResListDefaultCard = res => ({
  type: types.SET_RES_LIST_DEFAULT_CARD,
  payload: res,
});

export const setPayName = pay => ({
  type: types.SET_PAY_NAME,
  payload: pay,
});

export const setVisibleContact = con => ({
  type: types.SET_VISIBLE_CONTACT,
  payload: con,
});

export const setResLastOrder = res => ({
  type: types.SET_RES_LAST_ORDER,
  payload: res,
});

export const setAddressLabel = label => ({
  type: types.SET_ADDRESS_LABEL,
  payload: label,
});

export const setResDeleteAddress = res => ({
  type: types.SET_RES_DELETE_ADDRESS,
  payload: res,
});

export const setModalHeaderNav = nav => ({
  type: types.SET_MODAL_HEADER_NAV,
  payload: nav,
});

export const setResDefaultAddress = address => ({
  type: types.SET_RES_DEFAULT_ADDRESS,
  payload: address,
});

export const setInfoOneAddress = address => ({
  type: types.SET_INFO_ONE_ADDRESS,
  payload: address,
});

export const setResAddressUpdate = update => ({
  type: types.SET_RES_ADDRESS_UPDATE,
  payload: update,
});

export const setResOneTimeAddress = one => ({
  type: types.SET_RES_ONE_TIME_ADDRESS,
  payload: one,
});

export const setConfirmOrderPay = pay => ({
  type: types.SET_CONFIRM_ORDER_PAY,
  payload: pay,
});

export const setTotalPrices = data => ({
  type: types.SET_TOTAL_PRICES,
  payload: data,
});

export const setDeliveryTrackTime = data => ({
  type: types.SET_DELIVERY_TRACK_TIME,
  payload: data,
});

export const setOrderStatus = value => ({
  type: types.SET_ORDER_STATUS,
  payload: value,
});

export const setOrderDeliveryTrackTime = value => ({
  type: types.SET_ORDER_DELIVERY_TRACK_TIME,
  payload: value,
});

export const setOrderCourier = data => ({
  type: types.SET_ORDER_COURIER,
  payload: data,
});

export const getDataAddressList = token => dispatch => {
  const response = getAddressList(token);
  response
    .then(res => {
      console.log(res, 'Get All Address');
      dispatch(setListAddress(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get All Address');
    });
};

export const getDataAllMenuItemByRestraunt = (data, token) => dispatch => {
  const response = getAllMenuItemByRestraunt(data, token);
  response
    .then(res => {
      console.log(res, 'Get All Menu Item');
      dispatch(setAllMenuItem(res.data));
      dispatch(setSingleRestraunt(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get All Menu Item');
    });
};

export const getDataMenuItemForCategory = (data, token) => dispatch => {
  const response = getMenuItemForCategory(data, token);
  response
    .then(res => {
      console.log(res, 'Get Menu Item Category');
      dispatch(setItemMenuByCategory(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Menu Item Category');
    });
};

export const getDataFullRestrauntInfo = (data, token) => dispatch => {
  const response = getFullRestrauntInfo(data, token);
  response
    .then(res => {
      console.log(res, 'Get Full Info Restraunt Info');
      dispatch(setFullRestrauntInfo(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Full Info Restraunt Info');
    });
};

export const postDataAddFavoriteItem = (data, token) => dispatch => {
  const response = postAddFavoriteItem(data, token);
  response
    .then(res => {
      console.log(res, 'ADD FAVORITE ITEM');
      dispatch(setResponseFav(res.message));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in ADD FAVORITE ITEM');
    });
};

export const postDataRemoveFavoriteItem = (data, token) => dispatch => {
  const response = postRemoveFavoriteItem(data, token);
  response
    .then(res => {
      console.log(res, 'Remove FAVORITE ITEM');
      dispatch(setResponseFav(res.message));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Remove FAVORITE ITEM');
    });
};

export const getDataAllFavoritesItem = token => dispatch => {
  const response = getAllFavoritesItem(token);
  response
    .then(res => {
      console.log(res, 'Get All Favotites');
      dispatch(setAllFavorites(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get All Favotites');
    });
};

export const postDataPromoCode = (data, token) => dispatch => {
  const response = postPromoCode(data, token);
  response
    .then(res => {
      console.log(res, 'Post Promo Code');
      dispatch(setResPromo(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Promo Code');
    });
};

export const postDataSetItemMenuInCart = (data, token) => dispatch => {
  const response = postSetItemMenuInCart(data, token);
  response
    .then(res => {
      console.log(res, 'Post Set Item In Cart');
      dispatch(setResSetInCart(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Set Item In Cart');
    });
};

export const postDataDeleteItemMenuInCart = (data, token) => dispatch => {
  const response = postDeleteItemMenuInCart(data, token);
  response
    .then(res => {
      console.log(res, 'Post Delete Item In Cart');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Delete Item In Cart');
    });
};

export const postDataDeleteAllItemFromCart = token => dispatch => {
  const response = postDeleteAllItemFromCart(token);
  response
    .then(res => {
      console.log(res, 'Post Delete All Item In Cart');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Delete All Item In Cart');
    });
};

export const getDataAllCart = token => dispatch => {
  const response = getAllCart(token);
  response
    .then(res => {
      console.log(res, 'Get All Cart');
      dispatch(setAllCartItem(res.data));
      dispatch(setResGetCart(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get All Cart');
    });
};

export const getDataAllOrders = (token, count) => dispatch => {
  const response = getAllOrders(token, count);
  response
    .then(res => {
      console.log(res, 'Get All Orders');
      dispatch(setAllOrders(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get All Orders');
    });
};

export const postDataProceedOrder = (data, token) => dispatch => {
  const response = postProceedOrder(data, token);
  response
    .then(res => {
      console.log(res, 'Post Proceed Order');
      dispatch(setResProceedOrder(res));
      dispatch(setTotalPrices(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Proceed Order');
    });
};

export const postDataDeliveryType = (data, token) => dispatch => {
  const response = postDeliveryType(data, token);
  response
    .then(res => {
      console.log(res, 'Post Delivery Type');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Delivery Type');
    });
};

export const postDataDeliveryAddress = (data, token) => dispatch => {
  const response = postDeliveryAddress(data, token);
  response
    .then(res => {
      console.log(res, 'Post Delivery Address');
      dispatch(setTotalPrices(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Delivery Address');
    });
};

export const postDataDeliveryPaymentType = (data, token) => dispatch => {
  const response = postDeliveryPaymentType(data, token);
  response
    .then(res => {
      console.log(res, 'Post Delivery Payment');
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Delivery Payment');
    });
};

export const postDataAddCardInOrder = (data, token, flag) => dispatch => {
  const response = postAddCardInOrder(data, token);
  response
    .then(res => {
      console.log(res, 'Post Add Card In Order');
      !flag && dispatch(setCardName(res.data.id));
      dispatch(setResAddCard(res.message));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Add Card In Order');
    });
};

export const getDataListAllCreditCard = token => dispatch => {
  const response = getListAllCreditCard(token);
  response
    .then(res => {
      console.log(res, 'Get Delivery Payment');
      dispatch(setListCreditCard(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Delivery Payment');
    });
};

export const postDataAddressDetails = (data, token) => dispatch => {
  const response = postAddressDetails(data, token);
  response
    .then(res => {
      console.log(res, 'Post Add Delivery Address');
      dispatch(setResOneTimeAddress(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Add Delivery Address');
    });
};

export const postDataAddressGeneral = (data, token) => dispatch => {
  const response = postAddressDetails(data, token);
  response
    .then(res => {
      console.log(res, 'Post Add General Delivery Address');
      dispatch(setResAddDeliverAddress(res));
    })
    .catch(err => {
      console.log(
        err,
        'Something went wrong in Post Add General Delivery Address',
      );
    });
};

export const postDataDeliveryTime = (data, token) => dispatch => {
  const response = postDeliveryTime(data, token);
  response
    .then(res => {
      console.log(res, 'Post Delivery Time');
      dispatch(setResDeliveryTime(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Delivery Time');
    });
};

export const postDataConfirmOrder = (data, token) => dispatch => {
  const response = postConfirmOrder(data, token);
  response
    .then(res => {
      console.log(res, 'Post Confirm Order');
      dispatch(setResConfirmOrder(res));
      dispatch(setConfirmOrderPay(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Confirm Order');
    });
};

export const postDataSimpleOrderInfo = (data, token) => dispatch => {
  const response = postSimpleOrderInfo(data, token);
  response
    .then(res => {
      console.log(res, 'Post Simple Order Info');
      dispatch(setResDataSimplOrder(res.data));
      dispatch(setDeliveryTrackTime(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Simple Order Info');
    });
};

export const postDataCancelOrder = (data, token) => dispatch => {
  const response = postCancelOrder(data, token);
  response
    .then(res => {
      console.log(res, 'Post Cancel Order');
      dispatch(setResCancelOrder(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Cancel Order');
    });
};

export const postDataDeleteCreditCard = (data, token) => dispatch => {
  const response = postDeleteCreditCard(data, token);
  response
    .then(res => {
      console.log(res, 'Post Delete Credit Card');
      dispatch(setResDeleteCard(res.message));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Delete Credit Card');
    });
};

export const postDataPaySettingsUpdate = (data, token) => dispatch => {
  const response = postPaySettingsUpdate(data, token);
  response
    .then(res => {
      console.log(res, 'Post Pay Settings');
      dispatch(setResDefaultCard(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Pay Settings');
    });
};

export const getDataAllDefaultCardInfo = token => dispatch => {
  const response = getAllDefaultCardInfo(token);
  response
    .then(res => {
      console.log(res, 'Get Pay Default');
      dispatch(setResListDefaultCard(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Pay Default');
    });
};

export const getDataInfoLastOrder = token => dispatch => {
  const response = getInfoLastOrder(token);
  response
    .then(res => {
      console.log(res, 'Get Last Order Info');
      dispatch(setResLastOrder(res.data));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Last Order Info');
    });
};

export const postDataDeleteAddress = (data, token) => dispatch => {
  const response = postDeleteAddress(data, token);
  response
    .then(res => {
      console.log(res, 'Post Delete Address');
      dispatch(setResDeleteAddress(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Delete Address');
    });
};

export const postDataSetDefaultAddress = (data, token) => dispatch => {
  const response = postSetDefaultAddress(data, token);
  response
    .then(res => {
      console.log(res, 'Post Default Address');
      dispatch(setResDefaultAddress(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Default Address');
    });
};

export const getDataOneAddressInfo = (data, token) => dispatch => {
  const response = getOneAddressInfo(data, token);
  response
    .then(res => {
      console.log(res, 'Get One Address Info');
      dispatch(setInfoOneAddress(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get One Address Info');
    });
};

export const postDataUpdateAddress = (data, token) => dispatch => {
  const response = postUpdateAddress(data, token);
  response
    .then(res => {
      console.log(res, 'Post Update Address');
      dispatch(setResAddressUpdate(res));
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Post Update Address');
    });
};
