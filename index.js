import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import App from './App';
import { name as appName } from './app.json';
import store from './src/redux';

import { getDataProfile } from './src/redux/actions/AuthAction';

import {
  setOrderId,
  setRateOrderId,
  setTrigerOrderReady,
} from './src/redux/actions/MainDriverAction';
import {
  setOrderCourier,
  setOrderDeliveryTrackTime,
  setOrderStatus,
} from './src/redux/actions/MainUserAction';

export const initNotificationAndroid = () => {
  const initialStore = store.getState();

  PushNotification.configure({
    onNotification(notification) {
      console.log('[Notifications] on notification:', notification);

      // Check if opened from forground
      if (notification.data.openedInForeground) {
        notification.userInteraction = true;
      }

      if (notification.userInteraction) {
        this.onNotificationCallback?.(notification);
      }

      // Only call callback if not from foreground
      if (!notification.data.openedInForeground) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },
  });
  PushNotification.createChannel(
    {
      channelId: '1',
      channelName: 'My channel',
    },
    created => console.log(`createChannel returned ‘${created}’`),
  );
  //   listener for closed app android
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (
      remoteMessage.data.type === 'courierOrderRequest' ||
      remoteMessage.data.type === 'courierAcceptedOrder'
    ) {
      await store.dispatch(setOrderId(remoteMessage.data.requestId));
    }
    if (remoteMessage.data.type === 'courierAcceptedOrder') {
      store.dispatch(setOrderCourier(remoteMessage.data.Courier));
    }
    if (remoteMessage.data.type === 'rateOrder') {
      store.dispatch(setRateOrderId(remoteMessage.data.orderId));
    }
    if (remoteMessage.data.type === 'courierKycVerificationRequired') {
      store.dispatch(
        getDataProfile(
          initialStore.auth.asyncToken,
          initialStore.auth.asyncRole,
        ),
      );
    }
    if (remoteMessage.data.type === 'supplierOrderIsReady') {
      store.dispatch(setTrigerOrderReady(remoteMessage.data.type));
    }
    if (remoteMessage.data.type === 'supplierOrderDelayed') {
      store.dispatch(
        setOrderDeliveryTrackTime(remoteMessage.data.expectedDeliveryTime),
      );
    }
    if (remoteMessage.data.type === 'allSuppliersHaveConfirmed') {
      store.dispatch(setOrderStatus(true));
    }
    //notifications handler for android
    PushNotification.localNotification({
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      channelId: '1',
    });
    PushNotificationIOS.addNotificationRequest({
      id: '1',
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
  });
  //listener for opened app android
  messaging().onMessage(async remoteMessage => {
    if (
      remoteMessage.data.type === 'courierOrderRequest' ||
      remoteMessage.data.type === 'courierAcceptedOrder'
    ) {
      await store.dispatch(setOrderId(remoteMessage.data.requestId));
    }
    if (remoteMessage.data.type === 'courierAcceptedOrder') {
      store.dispatch(setOrderCourier(remoteMessage.data.Courier));
    }
    if (remoteMessage.data.type === 'rateOrder') {
      store.dispatch(setRateOrderId(remoteMessage.data.orderId));
    }
    if (remoteMessage.data.type === 'courierKycVerificationRequired') {
      store.dispatch(
        getDataProfile(
          initialStore.auth.asyncToken,
          initialStore.auth.asyncRole,
        ),
      );
    }
    if (remoteMessage.data.type === 'supplierOrderIsReady') {
      store.dispatch(setTrigerOrderReady(remoteMessage.data.type));
    }
    if (remoteMessage.data.type === 'supplierOrderDelayed') {
      store.dispatch(
        setOrderDeliveryTrackTime(remoteMessage.data.expectedDeliveryTime),
      );
    }
    if (remoteMessage.data.type === 'allSuppliersHaveConfirmed') {
      store.dispatch(setOrderStatus(true));
    }
    //notifications handler for android
    PushNotification.localNotification({
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      channelId: '1',
    });
    PushNotificationIOS.addNotificationRequest({
      id: '1',
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
  });
};

initNotificationAndroid();

AppRegistry.registerComponent(appName, () => App);
