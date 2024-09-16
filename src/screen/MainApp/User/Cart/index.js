import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import styles from './style';

import { useAction } from '../../../../utils/utils';

import {
  postDataPromoCode,
  setPromoCode,
  getDataAllCart,
  setResPromo,
  postDataDeleteItemMenuInCart,
  postDataDeleteAllItemFromCart,
  getDataMenuItemForCategory,
  getDataAllMenuItemByRestraunt,
  postDataSetItemMenuInCart,
  setCategoryIds,
  getDataAllFavoritesItem,
  setFullSum,
  postDataProceedOrder,
  setOneTimeCard,
  setPayName,
  setCardName,
} from '../../../../redux/actions/MainUserAction';

import { postDataPushToken } from '../../../../redux/actions/MainDriverAction';

import HeaderCart from '../../../../components/HeaderCartNav';
import MainButton from '../../../../components/MainButton';
import WhiteMinus from '../../../../assets/icons/svg-icons/WhiteMinus';
import WhitePlus from '../../../../assets/icons/svg-icons/WhitePlus';
import TrashIcon from '../../../../assets/icons/svg-icons/TrashIcon';
import CartIcon from '../../../../assets/icons/svg-icons/CartIcon';

const CartScreen = ({ navigation }) => {
  const { asyncToken } = useSelector(state => state.auth);

  const {
    promoCode,
    allCartItem,
    resPromo,
    allMenuItem,
    sum,
    resProceedOrder,
    resListDefCard,
    creditCardList,
  } = useSelector(state => state.main);

  const { route, deviceId } = useSelector(state => state.driver);

  const postDataPromoCodeFn = useAction(postDataPromoCode);
  const setPromoCodeFn = useAction(setPromoCode);
  const getDataAllCartFn = useAction(getDataAllCart);
  const setResPromoFn = useAction(setResPromo);
  const postDataDeleteItemMenuInCartFn = useAction(
    postDataDeleteItemMenuInCart,
  );
  const postDataDeleteAllItemFromCartFn = useAction(
    postDataDeleteAllItemFromCart,
  );
  const getDataMenuItemForCategoryFn = useAction(getDataMenuItemForCategory);
  const getDataAllMenuItemByRestrauntFn = useAction(
    getDataAllMenuItemByRestraunt,
  );
  const getDataAllFavoritesItemFn = useAction(getDataAllFavoritesItem);
  const postDataSetItemMenuInCartFn = useAction(postDataSetItemMenuInCart);
  const setCategoryIdsFn = useAction(setCategoryIds);
  const setFullSumFn = useAction(setFullSum);
  const postDataProceedOrderFn = useAction(postDataProceedOrder);
  const setOneTimeCardFn = useAction(setOneTimeCard);
  const setPayNameFn = useAction(setPayName);
  const setCardNameFn = useAction(setCardName);
  const postDataPushTokenFn = useAction(postDataPushToken);

  useEffect(() => {
    getDataAllCartFn(asyncToken);
  }, []);

  const sumAllItem = allCartItem?.suppliers?.map(rest =>
    rest?.CartItems.map(item => item?.MenuItem.price * item?.amount),
  );

  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  const totalSum = sumAllItem?.map(item => item?.reduce(reducer));

  const [finishCartItemState, setFinishCartItemState] = useState(
    allCartItem.suppliers,
  );

  const finishSum =
    allCartItem.length !== 0
      ? resPromo?.data?.discount
        ? totalSum?.reduce(reducer).toFixed(2) - resPromo?.data?.discount
        : totalSum?.reduce(reducer).toFixed(2)
      : 0;
  useEffect(() => {
    setFullSumFn(finishSum.length >= 4 ? finishSum : finishSum?.toFixed(2));
    if (finishSum <= 0) {
      setFullSumFn(0);
    }
  }, [finishSum]);

  useEffect(() => {
    setFinishCartItemState(allCartItem.suppliers);
  }, [allCartItem]);

  const onChangeAmountHandle = (id, state, restId) => {
    const res = finishCartItemState?.map(rest => {
      if (rest.id === restId) {
        rest.CartItems = rest.CartItems.map(item => {
          if (item.MenuItem.id === id) {
            if (state === 'plus') {
              postDataSetItemMenuInCartFn(
                { id: id, amount: item.amount + 1 },
                asyncToken,
              );
              return { ...item, amount: item.amount + 1 };
            } else if (state === 'minus') {
              postDataSetItemMenuInCartFn(
                { id: id, amount: item.amount - 1 },
                asyncToken,
              );
              if (item.amount === 1) {
                handleDeleteItem(item.id);
              } else {
                return {
                  ...item,
                  amount: item.amount - 1,
                };
              }
            }
          }
          return item;
        });
        return rest;
      }
      return rest;
    });
    setFinishCartItemState(res);
  };

  const sendFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const tokenFcm = await messaging().getToken();
      postDataPushTokenFn(
        { fcmPushToken: tokenFcm, deviceId: deviceId },
        asyncToken,
      );
    } catch (err) {
      //Do nothing
      console.log(err.response.data, 'ERRRR');
    }
  };

  const handleDeleteItem = id => {
    postDataDeleteItemMenuInCartFn(
      {
        id,
      },
      asyncToken,
    );
    setTimeout(() => {
      getDataAllCartFn(asyncToken);
    }, 500);
  };

  useEffect(() => {
    resProceedOrder.message === 'success' &&
      navigation.navigate('DeliveryDetails');
  }, [resProceedOrder]);

  const handleProceed = async () => {
    setPayNameFn(resListDefCard.type);
    setCardNameFn(resListDefCard.paymentCardId);
    sendFcmToken();
    if (
      resListDefCard.type === 'ApplePay' ||
      resListDefCard.type === 'GooglePay'
    ) {
      setOneTimeCardFn(resListDefCard.type);
    } else if (resListDefCard.type === 'Card') {
      creditCardList.forEach(item => {
        if (item.isDefault) {
          setOneTimeCardFn(`Bank Card **** ${item.lastDigits}`);
        }
      });
    }
    await postDataProceedOrderFn(
      {
        code: resPromo.message === 'success' && promoCode,
      },
      asyncToken,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <View style={{ marginHorizontal: 16 }}>
          <HeaderCart
            navigatePress={() => {
              setCategoryIdsFn([]);
              setResPromoFn({});
              // setFullSumFn(0);
              getDataAllMenuItemByRestrauntFn(
                { id: allMenuItem.id },
                asyncToken,
              );
              getDataMenuItemForCategoryFn({ id: allMenuItem.id }, asyncToken);
              getDataAllFavoritesItemFn(asyncToken);
              if (route) {
                navigation.navigate('RestrauntMenuScreen');
              } else {
                navigation.navigate('MainScreen');
              }
            }}
            navigationTitle="Cart"
            onPressDelete={() => {
              setPromoCodeFn('');
              postDataDeleteAllItemFromCartFn(asyncToken);
              setTimeout(() => {
                getDataAllCartFn(asyncToken);
              }, 100);
            }}
          />
        </View>
        {allCartItem.length !== 0 ? (
          <ScrollView style={styles.mainContentScroll}>
            <>
              <View style={styles.delivetyTimeContainer}>
                <Text style={styles.deliveryTimeText}>
                  Time for delivery: 45 min
                </Text>
              </View>
              {finishCartItemState?.map((rest, index) => {
                return (
                  <View key={index + 1} style={styles.mainContentContainer}>
                    <View style={styles.titleContainer}>
                      <Image
                        source={{ uri: rest?.image }}
                        style={styles.favoritesImageRes}
                      />
                      <Text style={styles.titleText}>{rest?.name}</Text>
                    </View>
                    {rest.CartItems?.map((item, i) => {
                      return (
                        <View key={i + 1} style={styles.containerItemMenu}>
                          <View style={styles.imageContainer}>
                            <Image
                              style={styles.menuItemImage}
                              source={{
                                uri: `${item?.MenuItem?.image}`,
                              }}
                            />
                          </View>
                          <View style={styles.containerRight}>
                            <View>
                              <Text style={styles.itemTittle}>
                                {item?.MenuItem?.name}
                              </Text>
                              <Text style={styles.itemPrice}>
                                $
                                {(item?.MenuItem?.price * item.amount).toFixed(
                                  2,
                                )}
                              </Text>
                            </View>
                            <View style={styles.containerRightWithBut}>
                              <View style={styles.leftTwoButtonContainer}>
                                <TouchableOpacity
                                  onPress={() =>
                                    onChangeAmountHandle(
                                      item.MenuItem.id,
                                      'minus',
                                      rest.id,
                                      item,
                                    )
                                  }
                                  style={styles.changeButton}>
                                  <WhiteMinus />
                                </TouchableOpacity>
                                <Text style={styles.itemNumber}>
                                  {item?.amount}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    onChangeAmountHandle(
                                      item.MenuItem.id,
                                      'plus',
                                      rest.id,
                                    );
                                  }}
                                  style={styles.changeButton}>
                                  <WhitePlus />
                                </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                onPress={() => handleDeleteItem(item.id)}>
                                <TrashIcon />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
              <View style={styles.amountContainer}>
                <View style={styles.totalAmount}>
                  <Text style={styles.amountText}>Subtotal Amount:</Text>
                  <Text style={styles.amountNumber}>
                    ${allCartItem.length !== 0 && sum}
                  </Text>
                </View>
                <View style={styles.proceedContainer}>
                  <View style={styles.promoContainer}>
                    <TextInput
                      value={promoCode}
                      onChangeText={e => {
                        setPromoCodeFn(e);
                      }}
                      placeholder="Enter promo code"
                      style={styles.textInputPromo}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setResPromoFn('');
                        resPromo.message !== 'success'
                          ? postDataPromoCodeFn({ code: promoCode }, asyncToken)
                          : setPromoCodeFn('') && setResPromoFn({});
                      }}
                      style={styles.buttonApplyPromo}>
                      <Text style={styles.applyTextInButton}>
                        {resPromo.message !== 'success' ? 'Apply' : 'Cancel'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {!resPromo.success && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{resPromo.message}</Text>
                    </View>
                  )}
                  <View style={styles.containerProButton}>
                    <MainButton onPress={handleProceed} buttonText="Proceed" />
                  </View>
                </View>
              </View>
            </>
          </ScrollView>
        ) : (
          <View style={styles.emptyBasketContainer}>
            <CartIcon />
            <Text style={styles.underCartIconText}>Your cart is empty</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
