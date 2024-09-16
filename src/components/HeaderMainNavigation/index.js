import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import RadioButton from 'react-native-radio-button';
import {Switch} from 'react-native-switch';
import {useSelector} from 'react-redux';

import styles from './style';

import colors from '../../assets/colors/colors';

import {useAction} from '../../utils/utils';

import {getDataProfile} from '../../redux/actions/AuthAction';

import {
  getDataAddressList,
  setAddress,
  setModalHeaderNav,
  postDataSetDefaultAddress,
  setResDefaultAddress,
  getDataAllCart,
  setCartLoad,
} from '../../redux/actions/MainUserAction';

import {
  setDriverOnline,
  setStartWorkModal,
  setEndWorkModal,
  setResEndWork,
  setResStopWork,
  setNavigationRoute,
  setDataPositionStatus,
} from '../../redux/actions/MainDriverAction';

import {setModalFullInfo} from '../../redux/actions/AuthAction';

import Burger from '../../assets/icons/svg-icons/Burger';
import PlusIcon from '../../assets/icons/svg-icons/PlusIcon';
import LeftArrow from '../../assets/icons/svg-icons/LeftArrow';
import ArrowDownAddress from '../../assets/icons/svg-icons/ArrowDownAddress';

import ModalPicker from '../ModalPicker';
import CartComponent from '../CartComponent';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const MainNavigation = ({navigationAdd, navigatePress, switchRadio}) => {
  const {asyncToken, asyncRole, resProfile} = useSelector(state => state.auth);
  const {address, singleAddress, modalHeaderNav, resDefAddress, allCartItem} =
    useSelector(state => state.main);
  const {driverOnline, resEndWork, resStopWork} = useSelector(
    state => state.driver,
  );

  const setDriverOnlineFn = useAction(setDriverOnline);
  const navigation = useNavigation();

  const getDataAddressListFn = useAction(getDataAddressList);
  const setAddressFn = useAction(setAddress);
  const setModalHeaderNavFn = useAction(setModalHeaderNav);
  const postDataSetDefaultAddressFn = useAction(postDataSetDefaultAddress);
  const setResDefaultAddressFn = useAction(setResDefaultAddress);
  const getDataProfileFn = useAction(getDataProfile);

  const setStartWorkModalFn = useAction(setStartWorkModal);
  const setEndWorkModalFn = useAction(setEndWorkModal);
  const setResEndWorkFn = useAction(setResEndWork);
  const setResStopWorkFn = useAction(setResStopWork);
  const setModalFullInfoFn = useAction(setModalFullInfo);

  const getDataAllCartFn = useAction(getDataAllCart);
  const setCartLoadFn = useAction(setCartLoad);
  const setNavigationRouteFn = useAction(setNavigationRoute);

  useEffect(() => {
    if (asyncRole === 'client') {
      setDriverOnlineFn(true);
    }
  }, [asyncRole]);

  useEffect(() => {
    if (
      resProfile?.data?.courier?.isOnline ||
      resEndWork.message === 'success'
    ) {
      setDriverOnlineFn(true);
    } else if (
      !resProfile?.data?.courier?.isOnline ||
      resStopWork.message === 'success'
    ) {
      setDriverOnlineFn(false);
    }
  }, [resProfile, resEndWork]);

  useEffect(() => {
    getDataProfileFn(asyncToken, asyncRole);
  }, [resEndWork, resStopWork]);

  useEffect(() => {
    if (resEndWork.length > 0 && !resEndWork.success) {
      Alert.alert('Error', resEndWork.message);
    }
  }, [resEndWork]);

  useEffect(() => {
    if (asyncRole === 'client') {
      address.length &&
        address?.map(item => item.isDefault && setAddressFn(item));
      if (resDefAddress.message === 'success') {
        getDataAddressListFn(asyncToken);
        setResDefaultAddressFn({});
      }
    }
  }, [resDefAddress, address]);

  useEffect(() => {
    if (resEndWork.message === 'success') {
      setResEndWorkFn({});
    } else if (resStopWork.message === 'success') {
      setResStopWorkFn({});
    }
  }, [resStopWork.message, resEndWork.message]);

  const handleSwitch = val => {
    if (
      asyncRole === 'courier' &&
      resProfile?.data?.user?.cityId === null &&
      resProfile?.data?.user?.stateId === null
    ) {
      setModalFullInfoFn(true);
    } else {
      if (!resProfile?.data?.courier?.isOnline) {
        setStartWorkModalFn(true);
      } else if (resProfile?.data?.courier?.isOnline) {
        setEndWorkModalFn(true);
        setResEndWorkFn({});
      }
    }
  };

  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity onPress={navigatePress} style={styles.navigationButton}>
        <Burger />
      </TouchableOpacity>
      {asyncRole === 'courier' && (
        <>
          {!switchRadio && (
            <View style={styles.goOnlineContainer}>
              <Text style={styles.textOnline}>Online</Text>
              <Switch
                value={driverOnline}
                onValueChange={val => handleSwitch(val)}
                disabled={false}
                circleSize={25}
                barHeight={32}
                circleBorderWidth={0}
                backgroundActive={colors.buttonBackGroundColor}
                backgroundInactive="#706762"
                circleActiveColor={colors.white}
                circleInActiveColor={colors.white}
                changeValueImmediately={true}
                innerCircleStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={3}
                switchRightPx={3}
                switchWidthMultiplier={2}
                switchBorderRadius={30}
              />
            </View>
          )}
        </>
      )}
      {asyncRole === 'client' && (
        <>
          <View style={styles.navigationTextContainer}>
            <TouchableOpacity
              style={styles.dropTouchContainer}
              onPress={() => {
                setModalHeaderNavFn(true);
              }}>
              <Text numberOfLines={1} style={styles.headerTextDropDown}>
                {singleAddress.apartment
                  ? `${singleAddress?.apartment}, ${singleAddress?.street}, ${singleAddress?.city}`
                  : 'Add new address'}
              </Text>
              <View style={{marginLeft: 5}}>
                <ArrowDownAddress />
              </View>
            </TouchableOpacity>
          </View>
          <CartComponent
            onPress={() => {
              getDataAllCartFn(asyncToken);
              setCartLoadFn(true);
              setTimeout(() => {
                setNavigationRouteFn(false);
                navigation.navigate('CartScreen');
              }, 500);
            }}
          />
          <ModalPicker
            visible={modalHeaderNav}
            scroll={false}
            content={() => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setModalHeaderNavFn(false);
                    }}
                    style={styles.backButton}>
                    <LeftArrow />
                  </TouchableOpacity>
                  <View style={styles.headerContainer}>
                    <Text style={styles.textHeaderModal}>Delivery Address</Text>
                  </View>
                  <ScrollView
                    style={{flex: 1}}
                    persistentScrollbar={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}>
                    {asyncRole === 'client' && (
                      <>
                        {address.length ?
                          address?.map((item, index) => {
                            return (
                              <TouchableOpacity
                                key={index + 1}
                                onPress={() => {
                                  setModalHeaderNavFn(false);
                                  postDataSetDefaultAddressFn(
                                    {id: item.id},
                                    asyncToken,
                                  );
                                }}
                                style={[
                                  styles.paymentContainer,
                                  {
                                    borderColor: item.isDefault
                                      ? 'rgba(162, 28, 20, 0.3)'
                                      : '#fff',
                                  },
                                ]}>
                                <View style={styles.leftContainer}>
                                  <Text style={styles.textHeaderAddress}>
                                    {item?.label}
                                  </Text>
                                  <Text style={styles.textStyle}>
                                    {item?.apartment} {item?.street},{' '}
                                    {item?.city}
                                  </Text>
                                </View>
                                <View style={styles.radioContainer}>
                                  <RadioButton
                                    innerColor="#A11C14"
                                    outerColor="#A11C14"
                                    isSelected={item.isDefault ? true : false}
                                    onPress={() => {
                                      setModalHeaderNavFn(false);
                                      postDataSetDefaultAddressFn(
                                        {id: item.id},
                                        asyncToken,
                                      );
                                    }}
                                  />
                                </View>
                              </TouchableOpacity>
                            );
                          }) : null}
                      </>
                    )}
                    <TouchableOpacity
                      onPress={navigationAdd}
                      style={styles.addAddressContainer}>
                      <View style={styles.contentAddContainer}>
                        <PlusIcon />
                        <Text style={styles.textButtonAdd}>
                          Add new address
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </>
              );
            }}
          />
        </>
      )}
    </View>
  );
};

export default MainNavigation;
