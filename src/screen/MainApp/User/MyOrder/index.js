import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';

import styles from './style';

import {useAction} from '../../../../utils/utils';

import {
  getDataAllOrders,
  postDataSimpleOrderInfo,
  setResCancelOrder,
} from '../../../../redux/actions/MainUserAction';

import BackNavigation from '../../../../components/NavigationBack';
import ModalOrders from '../../../../components/ModalOrders';

import NoneOrderIcon from '../../../../assets/icons/svg-icons/NoneOrderIcon';
import ArrowRightRed from '../../../../assets/icons/svg-icons/ArrowRightRed';
import colors from '../../../../assets/colors/colors';

const MyOrder = ({navigation, route}) => {
  const [openModal, setOpenModal] = useState(false);

  const {asyncToken} = useSelector(state => state.auth);

  const {allOrders, resSimpleOrder, resCancelOrder} = useSelector(
    state => state.main,
  );

  const getDataAllOrdersFn = useAction(getDataAllOrders);
  const postDataSimpleOrderInfoFn = useAction(postDataSimpleOrderInfo);
  const setResCancelOrderFn = useAction(setResCancelOrder);

  const [amount, setAmount] = useState(15);

  useEffect(() => {
    getDataAllOrdersFn(asyncToken);
  }, []);

  useEffect(() => {
    if (route.params && route.params.trigerModal && route.params.orderId) {
      setOpenModal(true);
    }
  }, [route.params]);

  useEffect(() => {
    if (resCancelOrder.success) {
      getDataAllOrdersFn(asyncToken);
      setOpenModal(false);
      setResCancelOrderFn({});
    }
  }, [resCancelOrder]);

  useEffect(() => {
    getDataAllOrdersFn(asyncToken, amount);
  }, [amount]);

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {item && (
          <>
            <TouchableOpacity
              onPress={() => {
                postDataSimpleOrderInfoFn({id: item.id}, asyncToken);
                setTimeout(() => {
                  setOpenModal(true);
                }, 400);
              }}
              style={styles.orderContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.leftContentContainer}>
                  <Text style={styles.numberCodeStyle}>№ {item.id}</Text>
                  <View
                    style={[
                      styles.statusContainerElem,
                      {
                        backgroundColor:
                          item.status === 'delivered'
                            ? colors.backGroundBrown
                            : colors.borderGrey && item.status === 'canceled'
                            ? '#EB5757'
                            : colors.borderGrey,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            item.status === 'delivered'
                              ? colors.white
                              : colors.textDarkGrey,
                        },
                      ]}>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.rightArrowContainer}>
                  <ArrowRightRed />
                </View>
              </View>
              <View style={styles.contentDetailContainer}>
                <Text style={styles.contentStyleText}>
                  Total amount: ${item.finalPrice}
                </Text>
                <Text style={styles.contentStyleText}>
                  Order time: {moment(item.orderTime).format('LT')}
                </Text>
                <Text style={styles.contentStyleText}>
                  Delivery time: ~ {item.deliveryTime}
                </Text>
                <Text style={styles.contentStyleText}>
                  Delivery address: {item.deliveryAddress}
                </Text>
                <Text style={styles.contentStyleText}>
                  Payment type: {item.paymentType}
                </Text>
              </View>
              <View style={styles.borderBottom}></View>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation
          navigationTitle="My orders"
          navigatePress={() => {
            navigation.navigate('MainScreen');
            navigation.openDrawer();
            setAmount(15);
          }}
        />
        {allOrders?.data?.count < 1 ? (
          <View style={styles.noneContainer}>
            <NoneOrderIcon />
            <Text style={styles.noneText}>You have no orders</Text>
          </View>
        ) : (
          <View style={{flex: 1, marginTop: -20}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allOrders?.data?.rows}
              style={styles.safeArea}
              initialNumToRender={8}
              onEndReachedThreshold={0.4}
              onEndThreshold={0}
              keyExtractor={item => item.id}
              onEndReached={({distanceFromEnd}) => {
                distanceFromEnd < 500
                  ? setAmount(amount + 15) &&
                    getDataAllOrdersFn(asyncToken, amount)
                  : null;
              }}
              renderItem={renderItem}
            />
          </View>
        )}
        <ModalOrders
          visible={openModal}
          followOrder={() => {
            setOpenModal(false);
            navigation.navigate('DeliveryTrackMap');
          }}
          allData={resSimpleOrder}
          pressCancel={() => {
            setOpenModal(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyOrder;
