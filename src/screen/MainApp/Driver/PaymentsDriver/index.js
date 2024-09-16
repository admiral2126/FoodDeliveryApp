import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';

import {useAction} from '../../../../utils/utils';

import {getDataProfile} from '../../../../redux/actions/AuthAction';

import {
  setDriverAmountCard,
  setResWithdraw,
  postDataTakeMoney,
} from '../../../../redux/actions/MainDriverAction';

import styles from './style';

import BackNavigation from '../../../../components/NavigationBack';

import MainButton from '../../../../components/MainButton';
import MainInput from '../../../../components/MainInput';

const PaymentsDriverScreen = ({navigation}) => {
  const {resProfile, asyncToken, asyncRole} = useSelector(state => state.auth);
  const {driverAmountCard, resWithDraw} = useSelector(state => state.driver);

  const setDriverAmountCardFn = useAction(setDriverAmountCard);
  const postDataTakeMoneyFn = useAction(postDataTakeMoney);
  const setResWithdrawFn = useAction(setResWithdraw);
  const getDataProfileFn = useAction(getDataProfile);

  useEffect(() => {
    if (resWithDraw.success === false) {
      Alert.alert(resWithDraw.message);
    } else if (resWithDraw.success === true) {
      Alert.alert(resWithDraw.message);
      getDataProfileFn(asyncToken, asyncRole);
      setResWithdrawFn({});
      setDriverAmountCardFn('');
    }
  }, [resWithDraw]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.safeArea} contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <BackNavigation
            navigationTitle="Payments"
            navigatePress={() => {
              navigation.goBack();
              navigation.openDrawer();
            }}
          />
          <View style={styles.totalAmountContainer}>
            <View style={styles.numberAmountContainer}>
              <Text style={styles.numberStyle}>
                ${resProfile?.data?.courier?.balance}
              </Text>
              <Text style={styles.textUnderNum}>Total Balance</Text>
            </View>
          </View>
          <View style={styles.contentInputContainer}>
            <Text style={styles.titleText}>Amount</Text>
            <MainInput
              value={driverAmountCard}
              onChangeText={e => setDriverAmountCardFn(e)}
              label="Enter the amount you withdraw, $"
              placeholder="Enter the amount you withdraw, $"
              length={true}
              keyboard="number-pad"
            />
          </View>
          <View style={styles.buttonContainer}>
            <MainButton
              buttonText="Withdraw"
              onPress={() => {
                postDataTakeMoneyFn(
                  {
                    amount: driverAmountCard,
                  },
                  asyncToken,
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentsDriverScreen;
