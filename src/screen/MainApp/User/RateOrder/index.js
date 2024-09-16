import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import {useSelector} from 'react-redux';

import {useAction} from '../../../../utils/utils';

import styles from './style';

import {
  setGetDataRate,
  postDataRateOrder,
  setModalRate,
} from '../../../../redux/actions/MainDriverAction';

import StarComponent from '../../../../components/StarComponent';

import ItemRateComponent from '../../../../components/ItemRateComponent';
import MainButton from '../../../../components/MainButton';

const RateOrder = () => {
  const {asyncToken} = useSelector(state => state.auth);

  const {dataRate, modalRate} = useSelector(state => state.driver);

  const setGetDataRateFn = useAction(setGetDataRate);
  const postDataRateOrderFn = useAction(postDataRateOrder);
  const setModalRateFn = useAction(setModalRate);

  const [finalOrderRatingData, setFinalOrderRatingData] = useState([]);
  const [numberOfActiveStars, setActiveStars] = useState(0);

  useEffect(() => {
    const resArray = [];
    dataRate?.data?.OrderSuppliers?.map(item =>
      item?.OrderSupplierItems?.map(itemMenu => {
        resArray.push({id: itemMenu.id, rating: itemMenu.rating});
      }),
    );
    setFinalOrderRatingData(resArray);
  }, [dataRate]);

  const handleRatingClick = (id, rating) => {
    const finalOrderRatingDataCopy = finalOrderRatingData.map(item => {
      if (item.id == id) {
        return {...item, rating: rating};
      } else {
        return item;
      }
    });
    setFinalOrderRatingData(finalOrderRatingDataCopy);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalRate}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.safeArea}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.mainContainer]}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.skipContainer}>
              <TouchableOpacity
                onPress={() => {
                  setModalRateFn(false);
                  setGetDataRateFn({});
                }}
                style={styles.skipNavContainer}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.titleText}>Rate the order</Text>
              <Text style={styles.subTitleText}>
                Your opinion will help us improve our work.
              </Text>
            </View>
            {dataRate?.data?.OrderSuppliers?.map(item =>
              item?.OrderSupplierItems?.map((itemMenu, index) => {
                return (
                  <ItemRateComponent
                    handleRatingClick={(id, rating) =>
                      handleRatingClick(id, rating)
                    }
                    key={index + 1}
                    data={itemMenu}
                  />
                );
              }),
            )}
            <View style={styles.itemRateContainer}>
              <View style={styles.headerItemRateContainer}>
                <Text style={styles.itemNameText}>Delivery</Text>
                <Text style={styles.restrauntNameText}>
                  Rate the driver work
                </Text>
              </View>
              <StarComponent
                number={numberOfActiveStars}
                pressStar={number => {
                  setActiveStars(number);
                }}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton
              onPress={() => {
                setModalRateFn(false);
                setGetDataRateFn({});
                postDataRateOrderFn(
                  {
                    id: dataRate.data.id,
                    courierRating: numberOfActiveStars,
                    orderSupplierItemsRating: finalOrderRatingData,
                  },
                  asyncToken,
                );
                setActiveStars(0);
              }}
              buttonText="Rate"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default RateOrder;
