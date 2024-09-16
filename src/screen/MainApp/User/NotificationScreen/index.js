import React, { Fragment, useEffect } from 'react';
import {
  View,
  StatusBar,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useSelector } from 'react-redux';

import { useAction } from '../../../../utils/utils';

import {
  postDataGetRateOrderItem,
  setModalRate,
} from '../../../../redux/actions/MainDriverAction';

import styles from './style';

import BackNavigation from '../../../../components/NavigationBack';
import NotificationRight from '../../../../assets/icons/svg-icons/NotificationRight';

const Notification = ({ navigation }) => {
  const { asyncToken } = useSelector(state => state.auth);
  const { allNotification, dataRate } = useSelector(state => state.driver);

  const postDataGetRateOrderItemFn = useAction(postDataGetRateOrderItem);
  const setModalRateFn = useAction(setModalRate);

  useEffect(() => {
    if (dataRate.message === 'success') {
      setModalRateFn(true);
    }
  }, [dataRate]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.safeArea}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <BackNavigation
            navigationTitle="Notification"
            navigatePress={() => {
              navigation.goBack();
              navigation.openDrawer();
            }}
          />
          {allNotification?.data?.rows?.map((item, index) => {
            return (
              <Fragment key={index + 1}>
                <TouchableOpacity
                  style={styles.notificationListItem}
                  onPress={() => {
                    if (item.type === 'rateOrder') {
                      postDataGetRateOrderItemFn(
                        { id: item.data.orderId },
                        asyncToken,
                      );
                    }
                  }}>
                  <Text>{item.title}</Text>
                  <NotificationRight />
                </TouchableOpacity>
                <View style={styles.borderBottom}></View>
              </Fragment>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
