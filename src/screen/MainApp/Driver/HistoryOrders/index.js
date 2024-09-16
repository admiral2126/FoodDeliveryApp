import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';

import {useAction} from '../../../../utils/utils';

import {getDataHistoryOrderDriver} from '../../../../redux/actions/MainDriverAction';

import styles from './style';
import BackNavigation from '../../../../components/NavigationBack';
import colors from '../../../../assets/colors/colors';

const HistoryOrder = ({navigation}) => {
  const {asyncToken} = useSelector(state => state.auth);

  const {orderHistory} = useSelector(state => state.driver);

  const getDataHistoryOrderDriverFn = useAction(getDataHistoryOrderDriver);

  const [amount, setAmount] = useState(15);

  useEffect(() => {
    getDataHistoryOrderDriverFn(asyncToken);
  }, []);

  const renderItem = ({item}) => {
    return (
      item && (
        <>
          {/* <View style={styles.totalForDay}>
            <Text style={styles.titleTotalText}>Today (3)</Text>
            <Text style={styles.titleTotalNumber}>$53.97</Text>
          </View> */}
          <View style={styles.oneOrderCardContainer}>
            <View style={styles.headerOrderCard}>
              <Text style={styles.orderNumber}>Order №{item?.order?.id}</Text>
              <View
                style={[
                  styles.statusOrderButton,
                  {
                    backgroundColor:
                      item?.order?.status == 'canceled'
                        ? colors.pinkText
                        : colors.borderGrey || item?.order?.status == 'done'
                        ? colors.backGroundBrown
                        : colors.borderGrey,
                  },
                ]}>
                <Text
                  style={[
                    styles.statusButtonText,
                    {
                      color:
                        item?.order?.status == 'done'
                          ? colors.white
                          : colors.textDarkGrey,
                    },
                  ]}>
                  {item?.order?.status}
                </Text>
              </View>
            </View>
            <View style={styles.restrauntListContainer}>
              {item?.suppliers?.map((item, index) => {
                return (
                  <Text key={index + 1} style={styles.restrauntText}>
                    {item?.name}
                  </Text>
                );
              })}
            </View>
            <View style={styles.timeAndIncomeContainer}>
              <View style={styles.timeContainer}>
                <Text style={styles.headerText}>Time:</Text>
                <Text numberOfLines={1} style={styles.contentText}>
                  {item?.deliveryTime?.day + ' ' + item?.deliveryTime?.hour}
                </Text>
              </View>
              <View style={styles.incomeContainer}>
                <Text style={styles.headerText}>Income:</Text>
                <Text numberOfLines={1} style={styles.contentText}>
                  {item?.income?.symbol + ' ' + item?.income?.amount}
                </Text>
              </View>
            </View>
            <View style={styles.bottomBorder}></View>
          </View>
        </>
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <View style={{marginBottom: -20}}>
          <BackNavigation
            navigationTitle="History"
            navigatePress={() => {
              navigation.goBack();
              navigation.openDrawer();
              setAmount(15);
            }}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orderHistory?.data?.rows}
          style={styles.safeArea}
          initialNumToRender={8}
          onEndReachedThreshold={0.4}
          onEndThreshold={0}
          keyExtractor={item => item.id}
          onEndReached={({distanceFromEnd}) => {
            distanceFromEnd < 500
              ? setAmount(amount + 15) &&
                getDataHistoryOrderDriverFn(asyncToken, amount)
              : null;
          }}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryOrder;
