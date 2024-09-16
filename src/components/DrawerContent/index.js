import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import styles from './style';

import { useAction } from '../../utils/utils';
import {
  setChangeNavigation,
  setAsyncToken,
  setAsyncType,
  getDataProfile,
  setResProfile,
  setAsyncRole,
  postDataSwitchAccount,
  postDataSwitchCreateDriver,
  setResUpdate,
  setClearFilter,
  setFilterButton,
  setModalFullInfo,
  setResSwitchCreate,
  getDataAllState,
  setWaitSwap,
  userLogOut,
} from '../../redux/actions/AuthAction';

import {
  setAddress,
  getDataAllOrders,
  setClearAllMain,
  getDataListAllCreditCard,
  setVisibleContact,
  getDataInfoLastOrder,
  getDataAllCart,
  setCartLoad,
} from '../../redux/actions/MainUserAction';

import {
  getDataAllFaq,
  getDataAllNotification,
  setInfoChangeAccont,
  setNavigationRoute,
} from '../../redux/actions/MainDriverAction';

import LogOut from '../../assets/icons/svg-icons/DrawerMenuIcon/LogOut';
import Cancel from '../../assets/icons/svg-icons/DrawerMenuIcon/Cancel';
import OrderIcon from '../../assets/icons/svg-icons/DrawerMenuIcon/OrderIcon';
import CartIconMenu from '../../assets/icons/svg-icons/DrawerMenuIcon/CartIconMenu';
import Addresses from '../../assets/icons/svg-icons/DrawerMenuIcon/Addresses';
import Payment from '../../assets/icons/svg-icons/DrawerMenuIcon/Payment';
import Contact from '../../assets/icons/svg-icons/DrawerMenuIcon/Contact';
import Info from '../../assets/icons/svg-icons/DrawerMenuIcon/Info';
import Bell from '../../assets/icons/svg-icons/DrawerMenuIcon/Bell';
import History from '../../assets/icons/svg-icons/DrawerDriverIcon/History';
import Faq from '../../assets/icons/svg-icons/DrawerDriverIcon/Faq';

export function DrawerContent({ navigation }) {
  const {
    asyncToken,
    asyncRole,
    resProfile,
    resSwitch,
    asyncType,
    resCreateSwitch,
  } = useSelector(state => state.auth);

  const { allFaq, infoChangeAccount, allNotification } = useSelector(
    state => state.driver,
  );

  const setNav = useAction(setChangeNavigation);
  const setAsyncTokenFn = useAction(setAsyncToken);
  const setAsyncTypeFn = useAction(setAsyncType);
  const getDataProfileFn = useAction(getDataProfile);
  const setResProfileFn = useAction(setResProfile);
  const setAsyncRoleFn = useAction(setAsyncRole);
  const postSwitch = useAction(postDataSwitchAccount);
  const postDataSwitchCreateDriverFn = useAction(postDataSwitchCreateDriver);
  const name = resProfile?.data?.user?.firstName;
  const secondName = resProfile?.data?.user?.lastName;
  const setResUpdateFn = useAction(setResUpdate);
  const setAddressFn = useAction(setAddress);
  const setClearFilterFn = useAction(setClearFilter);
  const setFilterButtonFn = useAction(setFilterButton);
  const setClearAllMainFn = useAction(setClearAllMain);
  const getDataListAllCreditCardFn = useAction(getDataListAllCreditCard);
  const setVisibleContactFn = useAction(setVisibleContact);
  const getDataInfoLastOrderFn = useAction(getDataInfoLastOrder);
  const setModalFullInfoFn = useAction(setModalFullInfo);

  const getDataAllOrdersFn = useAction(getDataAllOrders);

  const setResSwitchCreateFn = useAction(setResSwitchCreate);
  const setWaitSwapFn = useAction(setWaitSwap);
  const getDataAllNotificationFn = useAction(getDataAllNotification);
  const setInfoChangeAccontFn = useAction(setInfoChangeAccont);

  const getDataAllCartFn = useAction(getDataAllCart);
  const setCartLoadFn = useAction(setCartLoad);
  const setNavigationRouteFn = useAction(setNavigationRoute);

  const getDataAllFaqFn = useAction(getDataAllFaq);
  const getAllState = useAction(getDataAllState);
  const logOut = useAction(userLogOut);

  useEffect(() => {
    if (resProfile?.length === 0) {
      getDataProfileFn(asyncToken, asyncRole);
    }
  }, [resProfile, asyncRole]);

  useEffect(() => {
    if (asyncRole !== 'courier') {
      getDataListAllCreditCardFn(asyncToken);
    }
  }, []);

  useEffect(() => {
    if (resSwitch.message === 'current user does not have courier account') {
      postDataSwitchCreateDriverFn(asyncToken);
      AsyncStorage.setItem('access_token', asyncToken);
      AsyncStorage.setItem('isNewUser', String(asyncType));
      setAsyncTokenFn(asyncToken);
      setAsyncTypeFn(String(asyncType));
    }
  }, [resSwitch.message]);

  useEffect(() => {
    getDataAllFaqFn({ role: asyncRole }, asyncToken);
  }, []);

  useEffect(() => {
    if (resCreateSwitch.message === 'courier account has been created') {
      postSwitch(
        {
          type: asyncRole === 'client' ? 'courier' : 'client',
        },
        asyncToken,
      );
      setResSwitchCreateFn({});
    }
  }, [resCreateSwitch.message]);

  const createTwoButtonAlert = () => {
    Alert.alert('Log out', 'Do you really want to log out from this account?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Log out',
        onPress: () => {
          logOut(asyncToken, asyncRole);
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
        },
      },
    ]);
  };

  const handlePostSwitch = () => {
    AsyncStorage.setItem('access_token', asyncToken);
    AsyncStorage.setItem('isNewUser', String(asyncType));
    setAsyncTokenFn(asyncToken);
    setAsyncTypeFn(String(asyncType));
    postSwitch(
      {
        type: asyncRole === 'client' ? 'courier' : 'client',
      },
      asyncToken,
    );
    setWaitSwapFn(true);
    navigation.navigate('MainScreen');
    setTimeout(() => {
      setWaitSwapFn(false);
    }, 2000);
  };

  const handlerSwitch = () => {
    if (asyncRole === 'client') {
      return (
        <View style={styles.mainNavigationContainer}>
          <TouchableOpacity
            onPress={() => {
              getDataAllCartFn(asyncToken);
              setCartLoadFn(true);
              setTimeout(() => {
                setNavigationRouteFn(false);
                navigation.navigate('CartScreen');
              }, 500);
            }}
            style={styles.menuElementTouch}>
            <CartIconMenu />
            <Text style={styles.mainNavigationText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyOrder');
              getDataAllOrdersFn(asyncToken);
            }}
            style={styles.menuElementTouch}>
            <OrderIcon />
            <Text style={styles.mainNavigationText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyAddresses');
              getAllState();
            }}
            style={styles.menuElementTouch}>
            <Addresses />
            <Text style={styles.mainNavigationText}>My Addresses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await getDataListAllCreditCardFn(asyncToken);
              navigation.navigate('PaymentMethods');
            }}
            style={styles.menuElementTouch}>
            <Payment />
            <Text style={styles.mainNavigationText}>Payment Methods</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              setVisibleContactFn(true);
              getDataInfoLastOrderFn(asyncToken);
            }}
            style={styles.menuElementTouch}>
            <Contact />
            <Text style={styles.mainNavigationText}>Contact Us</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Information');
            }}
            style={styles.menuElementTouch}>
            <Info />
            <Text style={styles.mainNavigationText}>Information</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (asyncRole === 'courier') {
      return (
        <View style={styles.mainNavigationContainer}>
          <TouchableOpacity
            onPress={() => {
              if (
                asyncRole == 'courier' &&
                resProfile?.data?.user?.cityId === null &&
                resProfile?.data?.user?.stateId === null
              ) {
                setModalFullInfoFn(true);
              } else {
                navigation.navigate('HistoryOrder');
              }
            }}
            style={styles.menuElementTouch}>
            <History />
            <Text style={styles.mainNavigationText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (
                asyncRole === 'courier' &&
                resProfile?.data?.user?.cityId === null &&
                resProfile?.data?.user?.stateId === null
              ) {
                setModalFullInfoFn(true);
              } else {
                getDataProfileFn(asyncToken, asyncRole);
                navigation.navigate('PaymentsDriverScreen');
              }
            }}
            style={styles.menuElementTouch}>
            <Payment />
            <Text style={styles.mainNavigationText}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (
                asyncRole === 'courier' &&
                resProfile?.data?.user?.cityId === null &&
                resProfile?.data?.user?.stateId === null
              ) {
                setModalFullInfoFn(true);
              } else if (allFaq.data.rows.length) {
                navigation.navigate('FaqScreen');
              }
            }}
            style={styles.menuElementTouch}>
            <Faq />
            <Text style={styles.mainNavigationText}>FAQ</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              if (
                asyncRole == 'courier' &&
                resProfile?.data?.user?.cityId === null &&
                resProfile?.data?.user?.stateId === null
              ) {
                setModalFullInfoFn(true);
              } else {
                navigation.navigate('ContactUsDriver');
              }
            }}
            style={styles.menuElementTouch}>
            <Contact />
            <Text style={styles.mainNavigationText}>Contact Us</Text>
          </TouchableOpacity> */}
        </View>
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        marginTop: Platform.OS === 'android' ? 15 : 0,
      }}>
      <DrawerContentScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
          }}
          style={{ marginLeft: 13 }}>
          <Cancel />
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
              setResUpdateFn('');
            }}>
            <Text style={styles.nameText}>
              {name?.length > 6 ? name.slice(0, 7) + '...' : name}{' '}
              {secondName?.length > 6
                ? secondName.slice(0, 7) + '...'
                : secondName}
            </Text>
            <Text style={styles.emailText}>
              {resProfile?.data?.user?.email}
            </Text>
          </TouchableOpacity>
          {asyncRole === 'client' || asyncRole === undefined ? (
            <TouchableOpacity
              onPress={() => {
                getDataAllNotificationFn(asyncToken);
                setTimeout(() => {
                  navigation.navigate('Notification');
                }, 200);
              }}>
              <Bell
                color={allNotification?.data?.count !== 0 ? '#EB5757' : null}
                circle={allNotification?.data?.count !== 0 ? '#fff' : null}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (
              asyncRole === 'client' &&
              resProfile?.data?.user?.cityId === null &&
              resProfile?.data?.user?.stateId === null
            ) {
              setInfoChangeAccontFn(true);
            } else {
              handlePostSwitch();
            }
            navigation.closeDrawer();
          }}
          style={[
            styles.swapAccount,
            {
              width:
                asyncRole === 'client' || asyncRole === undefined ? 140 : 168,
            },
          ]}>
          <Text style={styles.swapAccountText}>
            {asyncRole === 'client' || asyncRole === undefined
              ? `Driver's Account`
              : `Customer's Account`}
          </Text>
        </TouchableOpacity>
        {handlerSwitch()}
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSections}>
        <View style={styles.logOutContainer}>
          <TouchableOpacity
            onPress={() => {
              createTwoButtonAlert();
            }}
            style={styles.logOutTouch}>
            <LogOut />
            <Text style={styles.logOutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={infoChangeAccount}>
        <View style={styles.modalApproveContainer}>
          <View style={styles.approveContainer}>
            <Text style={styles.headerTextModal}>
              After press switch we create your driver account, but you must add
              all info and wait on confirmation
            </Text>
            <View style={styles.containerButton}>
              <TouchableOpacity
                style={styles.buttonStyleSkip}
                onPress={() => {
                  handlePostSwitch();
                  setInfoChangeAccontFn(false);
                }}>
                <Text style={styles.textInButton}>Switch account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyleSwap}
                onPress={() => {
                  setInfoChangeAccontFn(false);
                }}>
                <Text style={styles.textInButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
