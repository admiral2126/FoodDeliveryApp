import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';

import RadioButton from 'react-native-radio-button';

import styles from './style';

import {setPayment} from '../../../../redux/actions/AuthAction';

import {
  setOneTimeCard,
  setCardName,
  getDataListAllCreditCard,
  postDataPaySettingsUpdate,
  getDataAllDefaultCardInfo,
} from '../../../../redux/actions/MainUserAction';

import {useAction} from '../../../../utils/utils';

import BackNavigation from '../../../../components/NavigationBack';

import PlusIcon from '../../../../assets/icons/svg-icons/PlusIcon';
import ApplePay from '../../../../assets/icons/svg-icons/PaymentIcon/ApplePay';
import GooglePay from '../../../../assets/icons/svg-icons/PaymentIcon/GooglePay';
import BankCard from '../../../../assets/icons/svg-icons/PaymentIcon/BankCard';

const PaymentMethods = ({navigation}) => {
  const {asyncToken} = useSelector(state => state.auth);

  const {creditCardList, cardName, resListDefCard, resDefaultCard} =
    useSelector(state => state.main);

  const setPaymentMet = useAction(setPayment);
  const getDataListAllCreditCardFn = useAction(getDataListAllCreditCard);
  const postDataPaySettingsUpdateFn = useAction(postDataPaySettingsUpdate);
  const getDataAllDefaultCardInfoFn = useAction(getDataAllDefaultCardInfo);

  const setOneTimeCardFn = useAction(setOneTimeCard);

  const setCardNameFn = useAction(setCardName);

  const [payName, setPayName] = useState('');

  const mainIcon = type => {
    switch (type) {
      case 'ApplePay':
        return <ApplePay />;
      case 'GooglePay':
        return <GooglePay />;
      case 'Bank Card':
        return <BankCard />;
      default:
        break;
    }
  };

  useEffect(() => {
    getDataListAllCreditCardFn(asyncToken);
  }, []);

  useEffect(() => {
    getDataAllDefaultCardInfoFn(asyncToken);
  }, [resDefaultCard]);

  useEffect(() => {
    setPayName(resListDefCard.type);
    setCardNameFn(resListDefCard.paymentCardId);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation
          navigationTitle="Payment Methods"
          navigatePress={() => {
            navigation.goBack();
            navigation.openDrawer();
          }}
          pressEdit={() => navigation.navigate('EditPaymentMethod')}
          editCredCard
        />
        <>
          <View style={styles.headerContainer}>
            <View style={styles.innerTextCon}>
              <Text style={styles.textHeaderModal}>Payment method</Text>
              <Text style={styles.subHeaderText}>
                Choose a payment method for orders.
              </Text>
            </View>
          </View>
          <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.allPaymentContainer}>
              {resListDefCard.paymentTypes?.map((item, index) => {
                if (item === 'ApplePay' && Platform.OS === 'ios') {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setPayName(item);
                        setCardNameFn('');
                        postDataPaySettingsUpdateFn(
                          {
                            type: item,
                          },
                          asyncToken,
                        );
                      }}
                      key={index + 1}
                      style={[
                        styles.paymentContainerModal,
                        {
                          borderColor:
                            item === payName
                              ? 'rgba(162, 28, 20, 0.3)'
                              : '#fff',
                        },
                      ]}>
                      <View style={styles.leftContainerPayment}>
                        <View style={{marginRight: 12}}>{mainIcon(item)}</View>
                        <Text style={styles.textStylePay}>
                          {(item === 'ApplePay' && 'Apple Pay') ||
                            (item === 'GooglePay' && 'Google Pay')}
                        </Text>
                      </View>
                      <View style={styles.radioContainerPayment}>
                        <RadioButton
                          innerColor="#A11C14"
                          outerColor="#A11C14"
                          isSelected={item === payName ? true : false}
                          onPress={() => {
                            setCardNameFn('');
                            setPayName(item);
                            postDataPaySettingsUpdateFn(
                              {
                                type: item,
                              },
                              asyncToken,
                            );
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                } else if (item === 'GooglePay' && Platform.OS === 'android') {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setPayName(item);
                        setPaymentMet(item);
                        setCardNameFn('');
                        postDataPaySettingsUpdateFn(
                          {
                            type: item,
                          },
                          asyncToken,
                        );
                      }}
                      key={index + 1}
                      style={[
                        styles.paymentContainerModal,
                        {
                          borderColor:
                            item === payName
                              ? 'rgba(162, 28, 20, 0.3)'
                              : '#fff',
                        },
                      ]}>
                      <View style={styles.leftContainerPayment}>
                        <View style={{marginRight: 12}}>{mainIcon(item)}</View>
                        <Text style={styles.textStylePay}>{item}</Text>
                      </View>
                      <View style={styles.radioContainerPayment}>
                        <RadioButton
                          innerColor="#A11C14"
                          outerColor="#A11C14"
                          isSelected={item === payName ? true : false}
                          onPress={() => {
                            setPaymentMet(item);
                            setCardNameFn('');
                            setPayName(item);
                            postDataPaySettingsUpdateFn(
                              {
                                type: item,
                              },
                              asyncToken,
                            );
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
              {creditCardList.length > 0 &&
                creditCardList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCardNameFn(item.id);
                        setOneTimeCardFn(`Bank Card **** ${item.lastDigits}`);
                        setPaymentMet('Bank Card');
                        setPayName('Card');
                        postDataPaySettingsUpdateFn(
                          {
                            type: 'Card',
                            paymentCardId: item.id,
                          },
                          asyncToken,
                        );
                      }}
                      key={index + 1}
                      style={[
                        styles.paymentContainerModal,
                        {
                          borderColor:
                            item.id == cardName
                              ? 'rgba(162, 28, 20, 0.3)'
                              : '#fff',
                        },
                      ]}>
                      <View style={styles.leftContainerPayment}>
                        <View style={{marginRight: 12}}>
                          {mainIcon('Bank Card')}
                        </View>
                        <Text style={styles.textStylePay}>
                          Card **** {item.lastDigits}
                        </Text>
                      </View>
                      <View style={styles.radioContainerPayment}>
                        <RadioButton
                          innerColor="#A11C14"
                          outerColor="#A11C14"
                          isSelected={item.id == cardName ? true : false}
                          onPress={() => {
                            setCardNameFn(item.id);
                            setOneTimeCardFn(
                              `Bank Card **** ${item.lastDigits}`,
                            );
                            setPaymentMet('Bank Card');
                            setPayName('Card');
                            postDataPaySettingsUpdateFn(
                              {
                                type: 'Card',
                                paymentCardId: item.id,
                              },
                              asyncToken,
                            );
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddNewCardPaySec');
              }}
              style={styles.addAddressContainer}>
              <View style={styles.contentAddContainer}>
                <PlusIcon />
                <Text style={styles.textButtonAdd}>Add new card</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethods;
