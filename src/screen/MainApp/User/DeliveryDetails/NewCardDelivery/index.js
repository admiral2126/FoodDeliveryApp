import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Switch} from 'react-native-switch';
import {useSelector} from 'react-redux';
import {CardField, useStripe} from '@stripe/stripe-react-native';

import styles from './style';

import {useAction} from '../../../../../utils/utils';

import {
  postDataAddCardInOrder,
  setCardNumber,
  setCardHolder,
  setExpiryDate,
  setCvv,
  setSaveCard,
  setResAddCard,
  getDataListAllCreditCard,
  setOneTimeCard,
} from '../../../../../redux/actions/MainUserAction';

import BackNavigation from '../../../../../components/NavigationBack';
import MainInput from '../../../../../components/MainInput';
import SecondInput from '../../../../../components/SecondTypeMainInput';
import MainButton from '../../../../../components/MainButton';
import colors from '../../../../../assets/colors/colors';

const NewCardDelivery = ({navigation}) => {
  const {asyncToken} = useSelector(state => state.auth);

  const {
    cardNumber,
    cardHolderName,
    expiryDate,
    cvvCode,
    saveCard,
    resAddCard,
  } = useSelector(state => state.main);

  const postDataAddCardInOrderFn = useAction(postDataAddCardInOrder);
  const setCardNumberFn = useAction(setCardNumber);
  const setCardHolderFn = useAction(setCardHolder);
  const setExpiryDateFn = useAction(setExpiryDate);
  const setCvvFn = useAction(setCvv);
  const setSaveCardFn = useAction(setSaveCard);
  const setResAddCardFn = useAction(setResAddCard);
  const getDataListAllCreditCardFn = useAction(getDataListAllCreditCard);
  const setOneTimeCardFn = useAction(setOneTimeCard);

  const [ident, setIdent] = useState(false);

  useEffect(() => {
    if (resAddCard === 'success') {
      setResAddCardFn('');
      setOneTimeCardFn(
        `Bank Card **** ${cardNumber.substr(cardNumber.length - 4)}`,
      );
      getDataListAllCreditCardFn(asyncToken);
      navigation.navigate('DeliveryDetails');
      setIdent(false);
      setTimeout(() => {
        setCardNumberFn('');
        setCardHolderFn('');
        setExpiryDateFn('');
        setCvvFn('');
        setSaveCardFn(false);
      }, 100);
    }
  }, [resAddCard]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        style={styles.mainContainer}
        onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <BackNavigation
            navigationTitle="Add new card"
            navigatePress={() => {
              navigation.goBack();
              setIdent(false);
              setCardNumberFn('');
              setCardHolderFn('');
              setExpiryDateFn('');
              setCvvFn('');
              setSaveCardFn(false);
              setResAddCardFn('');
            }}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextStyle}>Add new card</Text>
          </View>
          <View
            style={[
              styles.mainInputContainer,
              {
                height:
                  cardNumber.length < 16 &&
                  ident &&
                  cardHolderName.length > 1 &&
                  resAddCard !== 'cardHolderName is required'
                    ? 170
                    : (cardNumber.length < 16 &&
                        cardHolderName.length < 1 &&
                        ident) ||
                      resAddCard === 'cardHolderName is required'
                    ? 200
                    : 145,
              },
            ]}>
            <MainInput
              value={cardNumber}
              onChangeText={e => {
                setCardNumberFn(e);
                setResAddCardFn('');
              }}
              label="Card number"
              placeholder="Card number"
              maxLength={16}
              keyboard="number-pad"
            />
            {cardNumber.length < 16 && ident ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Card number must be 16 characters
                </Text>
              </View>
            ) : null}
            {resAddCard == 'Payment-Card already added' && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Payment-Card already added
                </Text>
              </View>
            )}
            <View style={{marginTop: 10}}>
              <MainInput
                value={cardHolderName}
                onChangeText={e => {
                  setCardHolderFn(e);
                  setResAddCardFn('');
                }}
                label="Cardholder name"
                placeholder="Cardholder name"
                keyboard=""
                maxLength={15}
              />
            </View>
            {cardHolderName.length < 1 && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  CardHolder name not be empty
                </Text>
              </View>
            )}
            {resAddCard == 'Please provide valid Card holder full name' && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  CardHolder name must be in formate (Name Surname)
                </Text>
              </View>
            )}
          </View>
          <View style={styles.rowInputContainer}>
            <SecondInput
              value={expiryDate}
              onChangeText={e => {
                setExpiryDateFn(
                  e.replace(/^(0?[0-9]{2}|1[0-2]{2})([0-9]{2})$/g, '$1/$2'),
                );
                setResAddCardFn('');
              }}
              label="Expiry date"
              placeholder="Expiry date"
              maxLength={5}
              keyboard="number-pad"
            />
            <SecondInput
              value={cvvCode}
              onChangeText={e => setCvvFn(e)}
              label="CVV"
              placeholder="CVV"
              maxLength={3}
              keyboard="number-pad"
            />
          </View>
          {resAddCard == 'wrong card date' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorInput}>Wrong card date</Text>
            </View>
          )}
          {resAddCard === 'Card has been expired' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorInput}>Card has been expired</Text>
            </View>
          )}
          {expiryDate.length < 5 && ident && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorInput}>Expiry date not be valid</Text>
            </View>
          )}
          {cvvCode.length != 3 && ident && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorInput}>CVV must be 3 characters</Text>
            </View>
          )}
          <View style={styles.switchButtonContainer}>
            <Switch
              value={saveCard}
              onValueChange={val => setSaveCardFn(!saveCard)}
              disabled={false}
              circleSize={25}
              barHeight={30}
              circleBorderWidth={0}
              backgroundActive={colors.buttonBackGroundColor}
              backgroundInactive={colors.textLightBrown}
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
            <Text style={styles.textNearSwithc}>Save card for later</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton
              onPress={() => {
                setIdent(true);
                postDataAddCardInOrderFn(
                  {
                    cardHolderName: cardHolderName,
                    cardNumber: cardNumber,
                    cardExpiryDate: expiryDate,
                    cardCVV: cvvCode,
                    isOneTimeCard: !saveCard,
                  },
                  asyncToken,
                );
              }}
              buttonText="Add"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default NewCardDelivery;
