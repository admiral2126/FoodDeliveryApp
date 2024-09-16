import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './style';

import {
  getDataListAllCreditCard,
  postDataDeleteCreditCard,
  setResDeleteCard,
} from '../../../../../redux/actions/MainUserAction';

import {useAction} from '../../../../../utils/utils';

import BackNavigation from '../../../../../components/NavigationBack';

import BankCard from '../../../../../assets/icons/svg-icons/PaymentIcon/BankCard';
import TrashIcon from '../../../../../assets/icons/svg-icons/TrashIcon';

const EditPaymentMethod = ({navigation}) => {
  const {asyncToken} = useSelector(state => state.auth);
  const {creditCardList, resDeleteCard} = useSelector(state => state.main);

  const getDataListAllCreditCardFn = useAction(getDataListAllCreditCard);
  const postDataDeleteCreditCardFn = useAction(postDataDeleteCreditCard);
  const setResDeleteCardFn = useAction(setResDeleteCard);

  const mainIcon = type => {
    switch (type) {
      case 'Bank Card':
        return <BankCard />;
      default:
        break;
    }
  };

  useEffect(() => {
    if (resDeleteCard == 'success') {
      getDataListAllCreditCardFn(asyncToken);
      setResDeleteCardFn('');
    }
  }, [resDeleteCard]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation
          navigatePress={() => {
            navigation.goBack();
          }}
          saveChange
          pressSave={() => {
            navigation.goBack();
          }}
        />
        <>
          <View style={styles.mainHeaderContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.textHeaderModal}>Payment method</Text>
              <Text style={styles.subHeaderText}>
                Choose a payment method for orders.
              </Text>
            </View>
          </View>
          <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.allPaymentContainer}>
              {creditCardList?.map((item, index) => {
                return (
                  <View key={index + 1} style={[styles.paymentContainerModal]}>
                    <View style={styles.leftContainerPayment}>
                      <View style={{marginRight: 12}}>
                        {mainIcon('Bank Card')}
                      </View>
                      <Text style={styles.textStylePay}>
                        Card **** {item.lastDigits}
                      </Text>
                    </View>
                    <View style={styles.deleteContainerPayment}>
                      <TouchableOpacity
                        onPress={() => {
                          postDataDeleteCreditCardFn({id: item.id}, asyncToken);
                        }}>
                        <TrashIcon />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </>
      </View>
    </SafeAreaView>
  );
};

export default EditPaymentMethod;
