import React, { useState, useEffect } from 'react';
import { View, Linking, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { useAction } from '../utils/utils';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../rootNavigation/RootNavigation';

import {
  getDataAllMenuItemByRestraunt,
  getDataAllCart,
  setAddress,
  setClearAllMain,
} from '../redux/actions/MainUserAction';

import {
  setAsyncToken,
  setAsyncType,
  setAsyncRole,
  setChangeNavigation,
  setClearFilter,
  setResProfile,
  setFilterButton,
  setProfileStatusCodePositive,
  setProfileStatusCodeNegative,
  getDataProfile,
  setUserId,
  getDataRestrictedStatus,
} from '../redux/actions/AuthAction';

import { setDeepLink, setModalRate } from '../redux/actions/MainDriverAction';

import RateOrder from '../screen/MainApp/User/RateOrder';

import {
  ChooseType,
  PhoneRegister,
  VerifyPhone,
  SignUpForm,
  PaymentMethod,
  AddNewCard,
  Privacy,
  Terms,
  AppSent,
  MainScreen,
  Information,
  MyAddresses,
  MyOrder,
  PaymentMethods,
  Profile,
  EditProfile,
  RestrauntMenuScreen,
  CartScreen,
  DeliveryDetails,
  NewCardDelivery,
  AddressDeliveryDetails,
  Notification,
  EditPaymentMethod,
  AddNewCardPaySec,
  ApprovalProces,
  AnotherQuestion,
  LastOrderQuestin,
  AddNewGeneralAddress,
  GPSComponent,
  EditAddress,
  FaqScreen,
  ContactUsDriver,
  HistoryOrder,
  OrderDetailsScreen,
  RestrauntDetailsScreen,
  PaymentsDriverScreen,
  CPSAddressDelivery,
  DeliveryTrackMap,
  MapRouteScreen,
} from '../screen/indexNavigation';

import { DrawerContent } from '../components/DrawerContent';
import GlobalModalInfo from '../components/GlobalInfoModal';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => (
  <Drawer.Navigator
    drawerStyle={{
      borderTopEndRadius: 30,
      borderBottomEndRadius: 30,
    }}
    backBehavior="history"
    drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="MainScreen" component={MainScreen} />
    <Drawer.Screen name="Information" component={Information} />
    <Drawer.Screen name="MyAddresses" component={MyAddresses} />
    <Drawer.Screen name="MyOrder" component={MyOrder} />
    <Drawer.Screen name="PaymentMethods" component={PaymentMethods} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="EditProfile" component={EditProfile} />
    <Drawer.Screen name="RestrauntMenuScreen" component={RestrauntMenuScreen} />
    <Drawer.Screen name="CartScreen" component={CartScreen} />
    <Drawer.Screen name="DeliveryDetails" component={DeliveryDetails} />
    <Drawer.Screen name="NewCardDelivery" component={NewCardDelivery} />
    <Drawer.Screen
      name="AddressDeliveryDetails"
      component={AddressDeliveryDetails}
    />
    <Drawer.Screen name="Notification" component={Notification} />
    <Drawer.Screen name="EditPaymentMethod" component={EditPaymentMethod} />
    <Drawer.Screen name="AddNewCardPaySec" component={AddNewCardPaySec} />
    <Drawer.Screen name="ApprovalProces" component={ApprovalProces} />
    <Drawer.Screen name="AnotherQuestion" component={AnotherQuestion} />
    <Drawer.Screen name="LastOrderQuestin" component={LastOrderQuestin} />
    <Drawer.Screen
      name="AddNewGeneralAddress"
      component={AddNewGeneralAddress}
    />
    <Drawer.Screen name="GPSComponent" component={GPSComponent} />
    <Drawer.Screen name="EditAddress" component={EditAddress} />
    <Drawer.Screen name="FaqScreen" component={FaqScreen} />
    <Drawer.Screen name="ContactUsDriver" component={ContactUsDriver} />
    <Drawer.Screen name="HistoryOrder" component={HistoryOrder} />
    <Drawer.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
    <Drawer.Screen
      name="RestrauntDetailsScreen"
      component={RestrauntDetailsScreen}
    />
    <Drawer.Screen
      name="PaymentsDriverScreen"
      component={PaymentsDriverScreen}
    />
    <Drawer.Screen name="CPSAddressDelivery" component={CPSAddressDelivery} />
    <Drawer.Screen name="DeliveryTrackMap" component={DeliveryTrackMap} />
    <Drawer.Screen name="MapRouteScreen" component={MapRouteScreen} />
  </Drawer.Navigator>
);

const OnboardingStack = () => (
  <Stack.Navigator
    initialRouteName="SignIn"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ChooseType" component={ChooseType} />
    <Stack.Screen name="PhoneRegister" component={PhoneRegister} />
    <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
    <Stack.Screen name="SignUpForm" component={SignUpForm} />
    <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
    <Stack.Screen name="AddNewCard" component={AddNewCard} />
    <Stack.Screen name="Privacy" component={Privacy} />
    <Stack.Screen name="Terms" component={Terms} />
    <Stack.Screen name="AppSent" component={AppSent} />
    <Drawer.Screen name="MainScreen" component={MainScreen} />
  </Stack.Navigator>
);

const SignUpStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignUpForm" component={SignUpForm} />
    <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
    <Stack.Screen name="AddNewCard" component={AddNewCard} />
    <Stack.Screen name="Privacy" component={Privacy} />
    <Stack.Screen name="Terms" component={Terms} />
    <Stack.Screen name="AppSent" component={AppSent} />
    <Drawer.Screen name="MainScreen" component={MainScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const {
    asyncToken,
    asyncType,
    asyncRole,
    userId,
    changeNavigation,
    resProfile,
    profileStatusCodePositive,
    profileStatusCodeNegative,
    restrictedStatus,
  } = useSelector(state => state.auth);

  const { deepLink, dataRate } = useSelector(state => state.driver);
  const setAsyncTokenFn = useAction(setAsyncToken);
  const setAsyncTypeFn = useAction(setAsyncType);
  const setAsyncRoleFn = useAction(setAsyncRole);
  const getDataAllMenuItemByRestrauntFn = useAction(
    getDataAllMenuItemByRestraunt,
  );
  const getDataAllCartFn = useAction(getDataAllCart);
  const setDeepLinkFn = useAction(setDeepLink);
  const setModalRateFn = useAction(setModalRate);

  const setClearFilterFn = useAction(setClearFilter);
  const setNav = useAction(setChangeNavigation);
  const setAddressFn = useAction(setAddress);
  const setResProfileFn = useAction(setResProfile);
  const setFilterButtonFn = useAction(setFilterButton);
  const setClearAllMainFn = useAction(setClearAllMain);

  const getDataProfileFn = useAction(getDataProfile);
  const setProfileStatusCodePositiveFn = useAction(
    setProfileStatusCodePositive,
  );
  const setProfileStatusCodeNegativeFn = useAction(
    setProfileStatusCodeNegative,
  );

  const setUserIdFn = useAction(setUserId);
  const getDataRestrictedStatusFn = useAction(getDataRestrictedStatus);

  const [load, setLoad] = useState(true);
  const [emailVerify, setEmailVerify] = useState(false);

  useEffect(() => {
    if (resProfile?.data && asyncRole === 'courier') {
      if (
        !resProfile.data.user.isEmailVerified &&
        resProfile.data.user.cityId !== null &&
        resProfile.data.user.stateId !== null
      ) {
        setEmailVerify(true);
      } else {
        setEmailVerify(false);
      }
    }
  }, [resProfile]);

  useEffect(() => {
    if (asyncToken) {
      if (userId && profileStatusCodeNegative) {
        getDataRestrictedStatusFn(+userId);
      }
      if (profileStatusCodePositive && profileStatusCodeNegative) {
        setResProfileFn({});
        setProfileStatusCodePositiveFn('');
        setProfileStatusCodeNegativeFn('');
        getDataProfileFn(asyncToken, asyncRole);
      } else if (
        (profileStatusCodeNegative && restrictedStatus === true) ||
        (!profileStatusCodePositive && profileStatusCodeNegative)
      ) {
        setClearFilterFn('');
        AsyncStorage.clear();
        setAsyncTokenFn('');
        setAddressFn('');
        setAsyncTypeFn('');
        setResProfileFn({});
        setAsyncRoleFn('');
        setNav(false);
        setFilterButtonFn('');
        setClearAllMainFn();
        setProfileStatusCodePositiveFn('');
        setProfileStatusCodeNegativeFn('');
      }
    }
  }, [resProfile, profileStatusCodePositive, profileStatusCodeNegative]);

  useEffect(() => {
    const getUrl = async () => {
      let initialUrl = await Linking.getInitialURL();
      setDeepLinkFn(initialUrl);
      if (initialUrl === null) {
        return;
      }
      if (initialUrl.includes('open-restaurant') && asyncToken) {
        getDataAllMenuItemByRestrauntFn(
          { id: initialUrl.split('=')[1] },
          asyncToken,
        );
        getDataAllCartFn(asyncToken);
        setTimeout(() => {
          RootNavigation.navigate('RestrauntMenuScreen');
        }, 400);
      }
    };
    if (!deepLink) {
      getUrl();
    }
  }, [asyncToken, deepLink]);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (dataRate.message == 'success') {
      setModalRateFn(true);
    }
  }, [dataRate]);

  useEffect(() => {
    AsyncStorage.getItem('access_token').then(token => {
      if (token) {
        setAsyncTokenFn(token);
      }
    });
    AsyncStorage.getItem('role').then(role => {
      if (role) {
        setAsyncRoleFn(role);
      }
    });
    AsyncStorage.getItem('isNewUser').then(type => {
      if (type) {
        setAsyncTypeFn(type);
      }
    });
    AsyncStorage.getItem('userID').then(id => {
      if (id) {
        setUserIdFn(id);
      }
    });
  }, []);

  const handleNavigationStack = () => {
    if (changeNavigation || (asyncToken && asyncType === 'false')) {
      return <DrawerStack />;
    } else if (load) {
      return (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '45%',
          }}
          visible={load}>
          <ActivityIndicator size="large" color="#A21C14" />
        </View>
      );
    } else if (asyncToken && asyncType === 'true') {
       return <SignUpStack />;
    }
    else {
      return <OnboardingStack />;
    }
  };

  return (
    <NavigationContainer
      ref={RootNavigation.navigationRef}
      onReady={() => RNBootSplash.hide()}>
      {handleNavigationStack()}
      <RateOrder />
      <GlobalModalInfo
        visible={emailVerify}
        onPressOkey={() => {
          setEmailVerify(false);
        }}
        buttonText="OK"
        headerInfo="Info"
        infoText="Please verify your Email (verification letter in your mail)"
      />
    </NavigationContainer>
  );
};

export default AppNavigator;
