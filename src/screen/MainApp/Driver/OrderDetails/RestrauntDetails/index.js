import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';

import { useAction } from '../../../../../utils/utils';

import {
  postDataArrivedRestraunt,
  postDataOrderIsTaken,
  setTrigerOrderReady,
  setSeparateRestaurant,
  getDataRestrauntInfoForDriver,
  getDataCurrentOrderInfo,
} from '../../../../../redux/actions/MainDriverAction';

import styles from './style';
import colors from '../../../../../assets/colors/colors';

import BackNavigation from '../../../../../components/NavigationBack/index';
import MainButton from '../../../../../components/MainButton/index';

import DetailInfoIcon from '../../../../../assets/icons/svg-icons/DriverOrderIcon/DetailInfoIcon';
import PhoneRestrIcon from '../../../../../assets/icons/svg-icons/DriverOrderIcon/PhoneRestrIcon';

const RestrauntDetailsScreen = ({ navigation, route }) => {
  const { asyncToken } = useSelector(state => state.auth);

  const {
    allDetailInfo,
    currentOrderMessage,
    orderTrigerReady,
    allDetailInfoCurrentOrder,
    separateRestaurant,
  } = useSelector(state => state.driver);

  const postDataArrivedRestrauntFn = useAction(postDataArrivedRestraunt);
  const postDataOrderIsTakenFn = useAction(postDataOrderIsTaken);
  const setTrigerOrderReadyFn = useAction(setTrigerOrderReady);

  const getDataCurrentOrderInfoFn = useAction(getDataCurrentOrderInfo);

  const [restaurant, setRestraunt] = useState();

  useEffect(() => {
    allDetailInfoCurrentOrder?.data?.suppliers.map(item => {
      if (item.name === route.params.info.name) {
        setRestraunt(item);
      }
    });
  }, [allDetailInfoCurrentOrder, route, separateRestaurant]);

  useEffect(() => {
    if (orderTrigerReady === 'supplierOrderIsReady') {
      getDataCurrentOrderInfoFn(asyncToken);
      setTrigerOrderReadyFn('SwapOff');
    }
  }, [orderTrigerReady]);

  useEffect(() => {
    if (currentOrderMessage.message) {
      Alert.alert('Info', currentOrderMessage.message);
    }
  }, [currentOrderMessage]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation
          navigatePress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.mainContentContainer}>
          <View style={styles.headerRestrauntContainer}>
            <View style={styles.leftHeaderText}>
              <Text style={styles.restrauntNameText}>{restaurant?.name}</Text>
              <Text style={styles.locationText}>{restaurant?.street}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${allDetailInfo?.data?.client?.phone}`);
              }}
              style={styles.phoneButtonContainer}>
              <PhoneRestrIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <DetailInfoIcon />
            <Text style={styles.infoText}>{restaurant?.description}</Text>
          </View>
          <Text style={styles.orderHeader}>Order</Text>
          <ScrollView style={styles.itemListContainer}>
            {restaurant?.menuItems?.map((item, index) => {
              return (
                <View key={index + 1} style={styles.menuItemContainer}>
                  <View style={styles.menuItemImage}>
                    <Image
                      style={styles.menuItemImage}
                      source={{
                        uri: `${item?.image}`,
                      }}
                    />
                  </View>
                  <View style={styles.detailInfoContainer}>
                    <Text style={styles.nameItemText}>{item?.name}</Text>
                    <Text style={styles.otherTextStyle}>$ 7.63</Text>
                    <Text style={styles.otherTextStyle}>
                      Quantity: {item?.amount}
                    </Text>
                    <Text style={styles.otherTextStyle}>
                      Restaurant: {restaurant?.name}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View
            style={[
              styles.buttonContiner,
              {
                marginBottom: 10,
              },
            ]}>
            <MainButton
              onPress={() => {
                postDataArrivedRestrauntFn(
                  { restaurantId: restaurant?.id },
                  asyncToken,
                );
              }}
              buttonText="Arrived to the restaurant"
            />
          </View>
          <View
            style={[
              styles.buttonContiner,
              {
                marginTop: 15,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                postDataOrderIsTakenFn(
                  { restaurantId: restaurant?.id },
                  asyncToken,
                );
              }}
              disabled={!restaurant?.states?.isOrderReady}
              style={[
                styles.mainButtonContainer,
                {
                  backgroundColor: restaurant?.states?.isOrderReady
                    ? colors.buttonBackGroundColor
                    : colors.backGroundBrown,
                },
              ]}>
              <Text style={styles.buttonText}>Order is taken</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RestrauntDetailsScreen;
