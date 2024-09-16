import React, { useEffect, useState } from 'react';
import { Text, Platform } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { StripeProvider } from '@stripe/stripe-react-native';
import DeviceInfo from 'react-native-device-info';

import AppNavigator from './src/navigation/appNavigator';

import { setDeviceId } from './src/redux/actions/MainDriverAction';

import { getDataStripePubKey } from './src/redux/actions/AuthAction';

import store from './src/redux/index';

const App = () => {
  const [token, setToken] = useState('');
  const [allState, setAllState] = useState();

  useEffect(() => {
    store.dispatch(getDataStripePubKey());
    setTimeout(() => {
      let pubKey = store.getState();
      setAllState(pubKey.auth.stripePubKey);
    }, 1000);
  }, [allState]);

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  const handleLocationPermission = async () => {
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }
  };

  useEffect(() => {
    store.dispatch(setDeviceId(DeviceInfo.getUniqueId()));
    handleLocationPermission();
  }, []);

  AsyncStorage.getItem('access_token').then(token => {
    if (token) {
      setToken(token);
    }
  });

  return (
    <StripeProvider
      publishableKey={allState}
      merchantIdentifier="merchant.org.reactjs.native.example.moris">
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </StripeProvider>
  );
};

export default App;
