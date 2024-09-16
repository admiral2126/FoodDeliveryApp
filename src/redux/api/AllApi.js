// const mainRoute = 'https://api.morris-armstrong-ii-dev.ru';
// const mainRoute = 'https://api.3dmadcat.com';
// const mainRoute = 'https://api-dev-morris-armstrong-ii.in.ngrok.io';
// const mainRoute = 'http://192.168.100.5:20123';
const mainRoute = 'https://api.wxwdelivery.com';

function processResponse(response) {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1],
  }));
}

export const postPhoneNumber = data => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/public/services/authenticate/by/phone/request`,
    requestOptions,
  ).then(response => response.json());
};

export const postVerifyCode = data => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/public/services/firebase/auth/by/token`,
    // `${mainRoute}/public/services/authenticate/by/phone/verify`,
    requestOptions,
  ).then(response => response.json());
};

export const postSignUpClient = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/profile/update`,
    requestOptions,
  ).then(response => response.json());
};

export const postSignUpCourier = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/courier/profile/update`,
    requestOptions,
  ).then(response => response.json());
};

export const postSignUpUpdate = (data, token, role) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/${role}/profile/update`,
    requestOptions,
  ).then(response => response.json());
};

export const getAllState = data => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  return fetch(
    `${mainRoute}/public/system/states/get/all?offset=0&limit=100&order=asc`,
    requestOptions,
  ).then(response => response.json());
};

export const getAllCity = data => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/public/system/cities/get/all/by/state/id/?offset=0&limit=100&order=asc`,
    requestOptions,
  ).then(response => response.json());
};

export const getProfile = (token, role) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/${role === 'client' ? 'client' : 'courier'
    }/profile/get`,
    requestOptions,
  )
    .then(processResponse)
    .then(res => {
      const statusCode = res.status;
      const data = res;
      return data;
    })
    .catch(err => {
      console.log(err, 'Something went wrong in Get Profile Data');
      return { name: 'network error', description: '' };
    });
};
export const postSwitchAccount = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/common/account-type/switch-to`,
    requestOptions,
  ).then(response => response.json());
};

export const postSwitchCreateDriver = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/client/courier/create/account`,
    requestOptions,
  ).then(response => response.json());
};

export const getAllRestraunt = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/public/restaurant/find/all?offset=0&limit=15&order=desc`,
    requestOptions,
  ).then(response => response.json());
};

export const postAboutRestaurants = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/public/restaurant/find/all?offset=0&limit=15&order=desc`,
    requestOptions,
  ).then(response => response.json());
};

export const getAddressList = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/client/delivery-addresses/get/as/list`,
    requestOptions,
  ).then(response => response.json());
};

export const getAllMenuItemByRestraunt = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/public/restaurant/menu-categories/get/all/by/restaurant/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const getMenuItemForCategory = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/public/restaurant/menu-categories/get/all/by/restaurant/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const getFullRestrauntInfo = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/public/restaurant/full-info/get/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postAddFavoriteItem = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/favorite/menu-items/add/by/menu-item/id`,
    requestOptions,
  ).then(response => response.json());
};

export const postRemoveFavoriteItem = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/favorite/menu-items/remove/by/id`,
    requestOptions,
  ).then(response => response.json());
};

export const getAllFavoritesItem = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/client/favorite/menu-items/get`,
    requestOptions,
  ).then(response => response.json());
};

export const postPromoCode = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/discount-code/get/discount/by/code`,
    requestOptions,
  ).then(response => response.json());
};

export const postSetItemMenuInCart = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/cart/set/amount/by/menu-item/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postDeleteItemMenuInCart = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/cart/delete/cart-item/by/id`,
    requestOptions,
  ).then(response => response.json());
};

export const postDeleteAllItemFromCart = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${mainRoute}/private/client/cart/empty`, requestOptions).then(
    response => response.json(),
  );
};

export const getAllCart = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${mainRoute}/private/client/cart/get`, requestOptions).then(
    response => response.json(),
  );
};

export const getAllOrders = (token, count) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/client/orders/get/all/?offset=0&limit=${count}&order=desc`,
    requestOptions,
  ).then(response => response.json());
};

export const postProceedOrder = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/create`,
    requestOptions,
  ).then(response => response.json());
};

export const postDeliveryType = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/set/delivery-type`,
    requestOptions,
  ).then(response => response.json());
};

export const postDeliveryAddress = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/set/delivery-address`,
    requestOptions,
  ).then(response => response.json());
};

export const postDeliveryPaymentType = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/set/payment-type`,
    requestOptions,
  ).then(response => response.json());
};

export const postAddCardInOrder = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/payment-cards/add`,
    requestOptions,
  ).then(response => response.json());
};

export const getListAllCreditCard = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/client/payment-cards/get/as/list`,
    requestOptions,
  ).then(response => response.json());
};

export const postAddressDetails = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/delivery-addresses/add`,
    requestOptions,
  ).then(response => response.json());
};

export const postDeliveryTime = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/set/delivery-time`,
    requestOptions,
  ).then(response => response.json());
};

export const postConfirmOrder = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/confirm`,
    requestOptions,
  ).then(response => response.json());
};

export const postSimpleOrderInfo = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/get/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postCancelOrder = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/cancel/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postDeleteCreditCard = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/payment-cards/delete/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postPaySettingsUpdate = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/payment-settings/update`,
    requestOptions,
  ).then(response => response.json());
};

export const getAllDefaultCardInfo = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/client/payment-settings/get`,
    requestOptions,
  ).then(response => response.json());
};

export const getInfoLastOrder = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/client/orders/get/last/order`,
    requestOptions,
  ).then(response => response.json());
};

export const postDeleteAddress = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/delivery-addresses/delete/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postSetDefaultAddress = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/delivery-addresses/set/default/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const getOneAddressInfo = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/delivery-addresses/get/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postUpdateAddress = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/delivery-addresses/update/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postStartWork = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/work-shift/start`,
    requestOptions,
  ).then(response => response.json());
};

export const postStopWork = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/work-shift/stop`,
    requestOptions,
  ).then(response => response.json());
};

export const getAllFaq = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/public/faq/get/all/by/role/:role/?offset=0&limit=15&order=desc`,
    requestOptions,
  ).then(response => response.json());
};

export const postPushToken = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/common/notifications/fcm/update`,
    requestOptions,
  ).then(response => response.json());
};

export const getAllNotification = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/client/notifications/get/all/?offset=0&limit=15&order=desc`,
    requestOptions,
  ).then(response => response.json());
};

//test notification

export const pushNotification = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/client/notifications/get-push-test/`,
    requestOptions,
  ).then(response => response.json());
};

export const postAcceptOrder = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/courier/order-requests/accept/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postRejectOrder = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/courier/order-requests/reject/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const getInfoAboutOrder = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/courier/order-requests/get/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const getCurrentOrderInfo = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/orders/current/get`,
    requestOptions,
  ).then(response => response.json());
};

export const getHistoryOrderDriver = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/orders/history/get/all?offset=0&limit=15&order=desc`,
    requestOptions,
  ).then(response => response.json());
};

export const postGeoInfoAndTakeData = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/common/tools/geo/get/address/by/lat/:lat/lon/:lon/type/:type`,
    requestOptions,
  ).then(response => response.json());
};

export const postCancelOrderDriver = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/orders/current/cancel`,
    requestOptions,
  ).then(response => response.json());
};

export const getMyRoleAccount = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/common/account-type/get/my/role`,
    requestOptions,
  ).then(response => response.json());
};

export const postGetRateOrderItem = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/rating/get/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postRateOrder = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/client/orders/rating/rate/by/id/:id`,
    requestOptions,
  ).then(response => response.json());
};

export const postTakeMoney = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/courier/withdraw/requests/create/`,
    requestOptions,
  ).then(response => response.json());
};

export const getStripePubKey = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  return fetch(
    `${mainRoute}/public/services/stripe/pub-key/get/`,
    requestOptions,
  ).then(response => response.json());
};

export const postArrivedRestraunt = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/courier/restaurant/arrived/for/order/id/`,
    requestOptions,
  ).then(response => response.json());
};

export const postOrderIsTaken = (data, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(
    `${mainRoute}/private/courier/orders/take/by/restaurant/id/`,
    requestOptions,
  ).then(response => response.json());
};

export const getLinkKYC = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/kyc/get/link/`,
    requestOptions,
  ).then(response => response.json());
};

export const getPositionStatus = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/position-status/get`,
    requestOptions,
  ).then(response => response.json());
};

export const setPositionStatus = (body, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  return fetch(
    `${mainRoute}/private/courier/position-status/set`,
    requestOptions,
  ).then(response => response.json());
};

export const getRestrictedStatus = data => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  return fetch(
    `${mainRoute}/public/user/common/is/restricted/id/${data}`,
    requestOptions,
  ).then(response => response.json());
};

export const postOrderIsDelivered = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/orders/current/set-as-delivered`,
    requestOptions,
  ).then(response => response.json());
};

export const postClientDidntGetInTouch = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/orders/current/client-didnt-get-in-touch`,
    requestOptions,
  ).then(response => response.json());
};

export const getRestrauntInfoForDriver = (token, id) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${mainRoute}/private/courier/orders/current/supplier/get/by/restaurant/id/${id}`,
    requestOptions,
  ).then(response => response.json());
};

export const logOut = token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${mainRoute}/private/common/logout`, requestOptions).then(
    response => response.json(),
  );
};
