import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useSelector } from 'react-redux';

import {
  postDataCancelOrderDriver,
  setResCancelOrderDriver,
  postDataOrderIsDelivered,
  postDataClientDidntGetInTouch,
  setClearEndOrder,
  getDataCurrentOrderInfo,
  setTrigerOrderReady,
} from '../../../../redux/actions/MainDriverAction';

import { getDataProfile } from '../../../../redux/actions/AuthAction';

import { useAction } from '../../../../utils/utils';

import styles from './style';
import colors from '../../../../assets/colors/colors';

import MainNavigation from '../../../../components/HeaderMainNavigation';
import ModalCancelOrder from '../../../../components/ModalCancelOrder';
import ModalDriverInfo from '../../../../components/ModalInfoDriver';
import GlobalApprovePopUp from '../../../../components/GlobalApprovePopUp';

import VectorLineProgress from '../../../../assets/icons/svg-icons/DriverOrderIcon/VectorLineProgress';
import DetailInfoIcon from '../../../../assets/icons/svg-icons/DriverOrderIcon/DetailInfoIcon';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

const OrderDetailsScreen = ({ navigation }) => {
  const { asyncToken, asyncRole } = useSelector(state => state.auth);

  const { resCancel, allDetailInfoCurrentOrder, endOrder, orderTrigerReady } =
    useSelector(state => state.driver);

  const isFocused = useIsFocused();

  const postDataCancelOrderDriverFn = useAction(postDataCancelOrderDriver);
  const setResCancelOrderDriverFn = useAction(setResCancelOrderDriver);
  const getDataProfileFn = useAction(getDataProfile);

  const postDataOrderIsDeliveredFn = useAction(postDataOrderIsDelivered);
  const postDataClientDidntGetInTouchFn = useAction(
    postDataClientDidntGetInTouch,
  );
  const getDataCurrentOrderInfoFn = useAction(getDataCurrentOrderInfo);
  const setClearEndOrderFn = useAction(setClearEndOrder);
  const setTrigerOrderReadyFn = useAction(setTrigerOrderReady);

  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [restStatusArr, setResStatusArr] = useState([]);
  const [checkStatusChange, setCheckStatusChange] = useState(false);

  const [modalOrderDelivered, setOrderIsDelivered] = useState(false);
  const [modalClientTouch, setClientTouch] = useState(false);
  const [modalMiddleClientTouch, setModalMiddleClientTouch] = useState(false);
  const [waitState, setWaitState] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getDataCurrentOrderInfoFn(asyncToken);
    }
  }, [isFocused]);

  useEffect(() => {
    if (allDetailInfoCurrentOrder.length === 0) {
      setWaitState(true);
    } else {
      setWaitState(false);
    }
  }, [allDetailInfoCurrentOrder]);

  useEffect(() => {
    if (orderTrigerReady === 'supplierOrderIsReady') {
      setTrigerOrderReadyFn('SwapOff');
      getDataCurrentOrderInfoFn(asyncToken);
    }
  }, [orderTrigerReady]);

  const handleCheckFinishStatus = () => {
    const newArr = [];

    if (newArr.length > 0) {
      newArr.length;
    }

    allDetailInfoCurrentOrder?.data?.suppliers.map((item, index) => {
      if (item.states.isTakenByCourier === true) {
        newArr.push(item.states.isTakenByCourier);
      }
    });

    setResStatusArr(newArr);
  };

  useEffect(() => {
    handleCheckFinishStatus();
  }, [allDetailInfoCurrentOrder]);

  useEffect(() => {
    const isBelowThreshold = currentValue => currentValue === true;

    if (restStatusArr.length > 0) {
      if (restStatusArr.some(isBelowThreshold)) {
        setCheckStatusChange(true);
      }
    }
  }, [restStatusArr]);

  useEffect(() => {
    if (resCancel.message === 'order has been canceled') {
      navigation.goBack();
      setResCancelOrderDriverFn({});
    } else if (
      resCancel.message !== 'order has been canceled' &&
      resCancel.length
    ) {
      setModalInfo(true);
    }
  }, [resCancel]);

  useEffect(() => {
    if (endOrder.success) {
      navigation.navigate('MainScreen');
      setClearEndOrderFn();
      getDataProfileFn(asyncToken, asyncRole);
    }
  }, [endOrder]);

  const handleOpenDrawer = () => navigation.openDrawer();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.safeArea}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <MainNavigation navigatePress={handleOpenDrawer} switchRadio={true} />
          {!waitState ? (
            <View style={styles.mainOrderContainer}>
              <View style={styles.headerOrderContainer}>
                <Text style={styles.orderHeaderText}>
                  №{allDetailInfoCurrentOrder?.data?.order?.id}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MapRouteScreen');
                  }}>
                  <Text style={styles.mapButtoText}>View on Map</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.restrauntListContainer}>
                <View style={styles.progressContainer}>
                  {allDetailInfoCurrentOrder?.data?.suppliers?.map(
                    (item, index) => {
                      return (
                        <>
                          <View
                            style={[
                              styles.circlePoint,
                              {
                                backgroundColor: item.states.isTakenByCourier
                                  ? colors.buttonBackGroundColor
                                  : colors.borderGrey,
                              },
                            ]}>
                            <Text
                              style={[
                                styles.numberInPoint,
                                {
                                  color: item.states.isTakenByCourier
                                    ? colors.white
                                    : colors.textDarkGrey,
                                },
                              ]}>
                              {index + 1}
                            </Text>
                          </View>
                          <VectorLineProgress
                            color={item.states.isTakenByCourier}
                          />
                        </>
                      );
                    },
                  )}
                  <View
                    style={[
                      styles.circlePoint,
                      {
                        backgroundColor: colors.textDarkGrey,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.numberInPoint,
                        {
                          color: colors.white,
                        },
                      ]}>
                      {allDetailInfoCurrentOrder?.data?.suppliers?.length + 1}
                    </Text>
                  </View>
                </View>
                <View style={styles.allResrtraunList}>
                  {allDetailInfoCurrentOrder?.data?.suppliers?.map(
                    (item, index) => {
                      return (
                        <View
                          key={index + 1}
                          style={styles.restrauntProgresList}>
                          <View style={styles.soloRestrauntContainer}>
                            <Text style={styles.restrauntNameText}>
                              {item?.name}{' '}
                              <Text style={styles.distanceNumber}>
                                (~{item?.distance} km)
                              </Text>
                            </Text>
                            <Text style={styles.detailInfoText}>
                              {item?.street}
                            </Text>
                            <Text style={styles.detailInfoText}>
                              By{' '}
                              {moment(item?.pickUpDateTime).format('hh:mm A')}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('RestrauntDetailsScreen', {
                                info: item,
                              });
                            }}
                            style={styles.detailsInfoButton}>
                            <DetailInfoIcon />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                  )}
                  <View style={styles.customerPoint}>
                    <View style={styles.soloRestrauntContainer}>
                      <Text style={styles.restrauntNameText}>
                        Customer{' '}
                        <Text style={styles.distanceNumber}>
                          (~{allDetailInfoCurrentOrder?.data?.client?.distance}{' '}
                          km)
                        </Text>
                      </Text>
                      <Text style={styles.detailInfoText}>
                        {allDetailInfoCurrentOrder?.data?.deliveryAddress
                          ?.apartment +
                          ' ' +
                          allDetailInfoCurrentOrder?.data?.deliveryAddress
                            ?.street +
                          ' ' +
                          allDetailInfoCurrentOrder?.data?.deliveryAddress
                            ?.city}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.deliveryTypeContainer}>
                <Text style={styles.textDeliveryType}>Delivery Type:</Text>
                <Text style={styles.textMainType}>
                  {allDetailInfoCurrentOrder?.data?.deliveryType?.type}
                </Text>
              </View>
              <View style={styles.borderBottomLine} />
              <View style={styles.timeAndIncomeContainer}>
                <View style={styles.timeContainer}>
                  <Text style={styles.headerText}>Time:</Text>
                  <Text numberOfLines={1} style={styles.contentText}>
                    {allDetailInfoCurrentOrder?.data?.deliveryTime?.day +
                      ' ' +
                      allDetailInfoCurrentOrder?.data?.deliveryTime?.hour}
                  </Text>
                </View>
                <View style={styles.incomeContainer}>
                  <Text style={styles.headerText}>Income:</Text>
                  <Text numberOfLines={1} style={styles.contentText}>
                    {allDetailInfoCurrentOrder?.data?.income?.symbol +
                      ' ' +
                      allDetailInfoCurrentOrder?.data?.income?.amount}
                  </Text>
                </View>
              </View>
              <View style={styles.borderBottomLine} />
              <View style={styles.clientInfoContainer}>
                <Text style={styles.nameClientText}>
                  {allDetailInfoCurrentOrder?.data?.client?.firstName +
                    ' ' +
                    allDetailInfoCurrentOrder?.data?.client?.lastName}
                </Text>
                <Text style={styles.typeClientText}>Customer</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                {checkStatusChange ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setOrderIsDelivered(true);
                      }}
                      style={styles.bottomTwoButtons}>
                      <Text style={styles.cancelText}>Order is delivered</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalMiddleClientTouch(true);
                      }}
                      style={styles.bottomTwoButtons}>
                      <Text style={styles.cancelText}>
                        Client didn't get in touch
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setModal(true);
                    }}
                    style={styles.cancelOrderButton}>
                    <Text style={styles.cancelText}>Cancel the order</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                color={colors.buttonBackGroundColor}
                size="large"
              />
            </View>
          )}
        </View>
        <ModalCancelOrder
          visible={modal}
          pressCancelOrder={() => {
            postDataCancelOrderDriverFn(asyncToken);
            setModal(false);
          }}
          pressCancel={() => {
            setModal(false);
          }}
        />
        <ModalDriverInfo
          visible={modalInfo}
          message={
            resCancel.message !== 'order has been canceled'
              ? resCancel.message
              : ''
          }
          pressOkey={() => {
            setModalInfo(false);
          }}
        />
        <GlobalApprovePopUp
          visible={modalOrderDelivered}
          infoText="Would you like to mark the delivery as complete?"
          textApprove="Yes"
          textCancel="Not Yet"
          pressApprove={() => {
            postDataOrderIsDeliveredFn(asyncToken);
            setOrderIsDelivered(false);
          }}
          pressCancel={() => setOrderIsDelivered(false)}
        />
        <GlobalApprovePopUp
          visible={modalMiddleClientTouch}
          infoText="Are you not able to contact the client?"
          textApprove="Exactly"
          textCancel="Not sure"
          pressApprove={() => {
            setModalMiddleClientTouch(false);
            setClientTouch(true);
          }}
          pressCancel={() => setModalMiddleClientTouch(false)}
        />
        <GlobalApprovePopUp
          visible={modalClientTouch}
          infoText="If you are not able to contact the client, you may leave the order at the door. We will have the client informed of this."
          textApprove="Got It"
          textSize={true}
          pressApprove={() => {
            postDataClientDidntGetInTouchFn(asyncToken);
            setClientTouch(false);
          }}
          pressCancel={() => setClientTouch(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
