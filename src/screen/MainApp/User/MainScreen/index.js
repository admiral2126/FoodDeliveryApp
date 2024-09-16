import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import styles from './style';
import colors from '../../../../assets/colors/colors';

import { useAction } from '../../../../utils/utils';

import {
  postDataAboutRestaurants,
  getDataAllRestraunt,
  setResRestraunt,
  setAllRestraunt,
  setFilterButton,
  setAsyncType,
  getDataProfile,
  setResSwitch,
  setModalFullInfo,
  setAsyncRole,
  getDataMyRoleAccount,
  getDataAllState,
  setRestaurantLoaded,
} from '../../../../redux/actions/AuthAction';

import {
  setSingleRestraunt,
  setAllMenuItem,
  getDataAllMenuItemByRestraunt,
  getDataAllFavoritesItem,
  setLikeItem,
  postDataRemoveFavoriteItem,
  setDeleteFavMain,
  setOpenModal,
  postDataSetItemMenuInCart,
  getDataAllCart,
  postDataDeleteAllItemFromCart,
  setCartLoad,
  getDataAllDefaultCardInfo,
  setVisibleContact,
  setModalHeaderNav,
  getDataAddressList,
  getDataListAllCreditCard,
} from '../../../../redux/actions/MainUserAction';

import {
  setStartWorkModal,
  setEndWorkModal,
  postDataStartWork,
  postDataStopWork,
  postDataPushToken,
  getDataInfoAboutOrder,
  getDataCurrentOrderInfo,
  postDataAcceptOrder,
  postDataRejectOrder,
  postDataGetRateOrderItem,
  setNavigationRoute,
  setNavigationRouteAddress,
  postDataGeoInfoAndTakeData,
  getDataLinkKYC,
} from '../../../../redux/actions/MainDriverAction';

import TrashIcon from '../../../../assets/icons/svg-icons/TrashIcon';
import DriverIcon from '../../../../assets/icons/svg-icons/DriverOrderIcon/DriverIcon';

import MainNavigation from '../../../../components/HeaderMainNavigation';
import MenuItem from '../../../../components/MenuItem';
import ModalContact from '../../../../components/ContactModal';
import ModalAddFullInfo from '../../../../components/ModalWriteFullCourieInfo';
import ModalKYCVerify from '../../../../components/ModalKYCVerify';
import ModalStartWork from '../../../../components/ModalStartWork';
import ModalEndWork from '../../../../components/ModalEndWork';
import ModalOrderDriver from '../../../../components/ModalOrderDriver';
import { useSocket } from '../../../../hooks/useSocket';
import { DriverConfirmedModal } from '../../../../components/DriverConfirmedModal';

const MainScreen = ({ navigation }) => {
  const { connect, sock } = useSocket();

  const {
    allRestraunt,
    asyncToken,
    asyncRole,
    resRestraunt,
    filterButton,
    asyncType,
    resSwitch,
    resProfile,
    modalFullInfo,
    waitSwap,
    restaurantLoaded,
  } = useSelector(state => state.auth);

  const { allFavorites, likeItem, allCartItem, contact } = useSelector(
    state => state.main,
  );

  const {
    startWorkModal,
    endWorkModal,
    orderId,
    allDetailInfo,
    deviceId,
    rateOrderId,
    geoInfo,
    allDetailInfoCurrentOrder,
    kycLink,
    orderTrigerReady,
    acceptOrder,
    driverOnline,
  } = useSelector(state => state.driver);
  const postDataAboutRestaurantsFn = useAction(postDataAboutRestaurants);
  const getDataAllRestrauntFn = useAction(getDataAllRestraunt);
  const setResRestrauntFn = useAction(setResRestraunt);
  const setAllRestrauntFn = useAction(setAllRestraunt);
  const setRestaurantLoadedFn = useAction(setRestaurantLoaded);
  const setFilterButtonFn = useAction(setFilterButton);
  const setSingleRestrauntFn = useAction(setSingleRestraunt);
  const getDataAllMenuItemByRestrauntFn = useAction(
    getDataAllMenuItemByRestraunt,
  );
  const setAllMenuItemFn = useAction(setAllMenuItem);
  const getDataAllFavoritesItemFn = useAction(getDataAllFavoritesItem);
  const setLikeItemFn = useAction(setLikeItem);
  const setOpenModalFn = useAction(setOpenModal);
  const postDataRemoveFavoriteItemFn = useAction(postDataRemoveFavoriteItem);
  const setDeleteFavMainFn = useAction(setDeleteFavMain);
  const postDataSetItemMenuInCartFn = useAction(postDataSetItemMenuInCart);
  const getDataAllCartFn = useAction(getDataAllCart);
  const postDataDeleteAllItemFromCartFn = useAction(
    postDataDeleteAllItemFromCart,
  );
  const setAsyncTypeFn = useAction(setAsyncType);
  const setCartLoadFn = useAction(setCartLoad);
  const getDataAllDefaultCardInfoFn = useAction(getDataAllDefaultCardInfo);
  const setVisibleContactFn = useAction(setVisibleContact);
  const setModalHeaderNavFn = useAction(setModalHeaderNav);
  const getDataProfileFn = useAction(getDataProfile);
  const setResSwitchFn = useAction(setResSwitch);
  const setModalFullInfoFn = useAction(setModalFullInfo);

  const getDataAddressListFn = useAction(getDataAddressList);
  const getDataListAllCreditCardFn = useAction(getDataListAllCreditCard);

  const setStartWorkModalFn = useAction(setStartWorkModal);
  const setEndWorkModalFn = useAction(setEndWorkModal);
  const postDataStartWorkFn = useAction(postDataStartWork);
  const postDataStopWorkFn = useAction(postDataStopWork);
  const setAsyncRoleFn = useAction(setAsyncRole);
  const postDataPushTokenFn = useAction(postDataPushToken);
  const getDataInfoAboutOrderFn = useAction(getDataInfoAboutOrder);
  const getDataCurrentOrderInfoFn = useAction(getDataCurrentOrderInfo);
  const postDataAcceptOrderFn = useAction(postDataAcceptOrder);
  const postDataRejectOrderFn = useAction(postDataRejectOrder);

  const setNavigationRouteFn = useAction(setNavigationRoute);
  const setNavigationRouteAddressFn = useAction(setNavigationRouteAddress);
  const getDataMyRoleAccountFn = useAction(getDataMyRoleAccount);
  const postDataGetRateOrderItemFn = useAction(postDataGetRateOrderItem);
  const postDataGeoInfoAndTakeDataFn = useAction(postDataGeoInfoAndTakeData);
  const getDataLinkKYCFn = useAction(getDataLinkKYC);
  const getAllState = useAction(getDataAllState);

  const [itemMenu, setItemMenu] = useState('');
  const [orderModal, setOrderModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [verifyKYC, setVerifyKYC] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    if (resProfile?.data && asyncRole === 'courier') {
      if (
        resProfile.data.courier.isRequestSent &&
        !resProfile.data.courier.isKycCompleted
      ) {
        getDataLinkKYCFn(asyncToken);
        setTimeout(() => {
          setVerifyKYC(true);
        }, 1000);
      }
    }
  }, [resProfile]);

  useEffect(() => {
    getDataMyRoleAccountFn(asyncToken);
  }, [asyncRole]);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Favorites',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Food Trucks',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Stationary',
    },
  ];

  useEffect(() => {
    if (asyncRole === 'client') {
      getDataAllCartFn(asyncToken);
    }
    getAllState();
    setRestaurantLoadedFn(false);
    getDataAllRestrauntFn(asyncToken);
  }, []);

  useEffect(() => {
    if (allDetailInfo.data) {
      setOrderModal(true);
    }
  }, [allDetailInfo]);

  useEffect(() => {
    if (
      asyncRole === 'courier' &&
      orderId &&
      resProfile.data &&
      !resProfile.data.courier.hasActiveOrder
    ) {
      getDataInfoAboutOrderFn(
        {
          id: orderId,
        },
        asyncToken,
      );
    }
    if (
      asyncRole === 'courier' &&
      !orderId &&
      !allDetailInfo.success &&
      resProfile.data &&
      resProfile.data.courier.hasActiveOrder
    ) {
      getDataCurrentOrderInfoFn(asyncToken);
    }
  }, [orderId]);

  useEffect(() => {
    if (asyncRole === 'courier') {
      getDataCurrentOrderInfoFn(asyncToken);
    }
  }, [asyncRole]);

  useEffect(() => {
    if (acceptOrder) {
      getDataCurrentOrderInfoFn(asyncToken);
      setTimeout(() => {
        navigation.navigate('OrderDetailsScreen');
      }, 400);
    }
  }, [acceptOrder]);

  useEffect(() => {
    if (allDetailInfoCurrentOrder.success) {
      navigation.navigate('OrderDetailsScreen');
    }
  }, [allDetailInfoCurrentOrder]);

  useEffect(() => {
    if (rateOrderId) {
      postDataGetRateOrderItemFn({ id: rateOrderId }, asyncToken);
    }
  }, [rateOrderId]);

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

  useEffect(() => {
    sendFcmToken();
  }, []);

  useEffect(() => {
    if (asyncRole !== 'courier') {
      getDataAddressListFn(asyncToken);
      getDataListAllCreditCardFn(asyncToken);
    }
  }, [asyncRole]);

  useEffect(() => {
    if (
      asyncRole === 'courier' &&
      resProfile?.data?.user?.cityId === null &&
      resProfile?.data?.user?.stateId === null
    ) {
      setModalFullInfoFn(true);
    } else {
      setModalFullInfoFn(false);
    }
  }, [asyncRole, resProfile]);

  useEffect(() => {
    setAllMenuItemFn({});
  }, []);

  useEffect(() => {
    if (resSwitch.message === 'success') {
      AsyncStorage.setItem('role', asyncRole);
      AsyncStorage.getItem('role').then(role => {
        if (role) {
          setAsyncRoleFn(role);
        }
      });
      getDataProfileFn(asyncToken, asyncRole);
      setResSwitchFn({});
    }
  }, [resSwitch]);

  useEffect(() => {
    if (asyncType === 'true') {
      setAsyncTypeFn('false');
      AsyncStorage.setItem('isNewUser', 'false');
    }
  }, [asyncType]);

  const [finishFavoriteItemState, setFavoriteItemState] =
    useState(allFavorites);

  const checkCartFav = finishFavoriteItemState?.rows?.map(item =>
    item.MenuCategories.map(item =>
      item.MenuItems.map(item => item.amountInCart),
    ),
  );

  let resCheck = [];

  checkCartFav?.map(item => {
    item.map(item1 => {
      resCheck.push(item1);
    });
  });

  useEffect(() => {
    getDataAllDefaultCardInfoFn(asyncToken);
  }, []);

  useEffect(() => {
    setFavoriteItemState(allFavorites);
  }, [allFavorites]);

  useEffect(() => {
    if (geoInfo.message === 'success') {
      setModalHeaderNavFn(false);
      setNavigationRouteAddressFn(true);
      navigation.navigate('AddNewGeneralAddress');
    }
  }, [geoInfo]);

  const handleKYCVerify = () => {
    Linking.openURL(`${kycLink.data.url}`);
    setVerifyKYC(false);
  };

  useEffect(() => {
    connect(asyncToken);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        if (asyncRole === 'courier' && driverOnline) {
          sock.emit('live-position-of-courier-updated', {
            lat: latitude,
            lon: longitude,
          });
        }
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, [asyncToken]);

  const onChangeAmountHandle = (id, state, restId, restCategoryId, type) => {
    const res = finishFavoriteItemState?.rows?.map(rest => {
      if (rest.id === restId) {
        rest.MenuCategories = rest.MenuCategories.map(item => {
          if (item.id === restCategoryId) {
            item.MenuItems = item.MenuItems.map(menuItem => {
              if (menuItem.id === id) {
                if (state === 'plus' || state === 'add') {
                  postDataSetItemMenuInCartFn(
                    { id: id, amount: menuItem.amountInCart + 1 },
                    asyncToken,
                  );
                  setLikeItemFn({
                    ...menuItem,
                    amountInCart: menuItem.amountInCart + 1,
                    restId: restId,
                    restCategoryId: restCategoryId,
                  });
                  return {
                    ...menuItem,
                    amountInCart: menuItem.amountInCart + 1,
                  };
                } else if (state === 'minus') {
                  postDataSetItemMenuInCartFn(
                    { id: id, amount: menuItem.amountInCart - 1 },
                    asyncToken,
                  );
                  setLikeItemFn({
                    ...menuItem,
                    amountInCart:
                      menuItem.amountInCart === 1
                        ? menuItem.amountInCart
                        : menuItem.amountInCart - 1,
                    restId: restId,
                    restCategoryId: restCategoryId,
                  });
                  return {
                    ...menuItem,
                    amountInCart:
                      menuItem.amountInCart === 1
                        ? menuItem.amountInCart
                        : menuItem.amountInCart - 1,
                  };
                }
              }
              return menuItem;
            });
            return item;
          }
          return item;
        });
        return rest;
      }
      return rest;
    });
    setFavoriteItemState({ ...finishFavoriteItemState, rows: res });
  };

  const GOOGLE_API_KEY = 'AIzaSyDVeLnPHwCFDqvXRgY2xYVxfu7itgKq68Q';

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainFilterTouch}>
      <TouchableOpacity
        style={[
          styles.containerFilter,
          {
            backgroundColor:
              filterButton === item.title
                ? colors.backGroundBrown
                : colors.borderGrey,
          },
        ]}
        onPress={() => {
          itemMenu !== item.title ? setItemMenu(item.title) : setItemMenu('');
          if (item.title === 'Favorites') {
            getDataAllFavoritesItemFn(asyncToken);
          }
          setResRestrauntFn({});
          setAllRestrauntFn([]);
          filterButton !== item.title
            ? setFilterButtonFn(item.title)
            : setFilterButtonFn('');
          setRestaurantLoadedFn(false);
          postDataAboutRestaurantsFn(
            {
              type:
                (item.title === 'Stationary' && 'stationary') ||
                (item.title === 'Food Trucks' && 'mobile'),
            },
            asyncToken,
          );
        }}>
        <Text
          style={[
            styles.filterText,
            {
              color:
                filterButton === item.title
                  ? colors.white
                  : colors.textDarkGrey,
            },
          ]}>
          {item.title === 'Stationary' ? 'Restaurants' : item.title}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        {waitSwap ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            visible={waitSwap}>
            <ActivityIndicator
              size="large"
              color={colors.buttonBackGroundColor}
            />
          </View>
        ) : (
          <>
            <View style={{ marginHorizontal: 16 }}>
              <MainNavigation
                navigationAdd={() => {
                  postDataGeoInfoAndTakeDataFn(
                    {
                      lat: location.latitude,
                      lon: location.longitude,
                      type: 'google',
                    },
                    asyncToken,
                  );
                }}
                navigatePress={() => {
                  navigation.openDrawer();
                }}
              />
            </View>
            {asyncRole === 'client' && (
              <>
                <View
                  style={{
                    height: 70,
                  }}>
                  <FlatList
                    horizontal
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                </View>
                <ScrollView style={styles.mainContentScroll}>
                  <View style={styles.mainContentContainer}>
                    {!restaurantLoaded && (
                      <View style={styles.indicatorContainer}>
                        <ActivityIndicator size="large" color="#A21C14" />
                      </View>
                    )}
                    {restaurantLoaded && (
                      <>
                        {itemMenu === 'Favorites'
                          ? allFavorites.rows?.map((rest, index) => {
                              const allItemsOfRest = [];
                              rest.MenuCategories.map(categoryAdd =>
                                categoryAdd.MenuItems.map(itemAdd =>
                                  allItemsOfRest.push(itemAdd),
                                ),
                              );
                              return (
                                <>
                                  {allItemsOfRest.length !== 0 && (
                                    <>
                                      <View
                                        key={index + 1}
                                        style={styles.containerRestFav}>
                                        <Image
                                          source={{ uri: rest.image }}
                                          style={styles.favoritesImageRes}
                                        />
                                        <Text style={styles.restrauntName}>
                                          {rest.name}
                                        </Text>
                                      </View>
                                      <View style={styles.mainContainerFavItem}>
                                        <View style={styles.menuFavContainer}>
                                          {rest.MenuCategories.map(category => {
                                            return (
                                              category.MenuItems.length !==
                                                0 && (
                                                <>
                                                  {category.MenuItems.map(
                                                    (item, i) => {
                                                      return (
                                                        <MenuItem
                                                          key={i + 1}
                                                          pressLike={() => {
                                                            postDataRemoveFavoriteItemFn(
                                                              { id: item.id },
                                                              asyncToken,
                                                            );
                                                            setDeleteFavMainFn(
                                                              rest.id,
                                                              category.id,
                                                              item.id,
                                                            );
                                                          }}
                                                          pressItem={() => {
                                                            setLikeItemFn({
                                                              ...item,
                                                              restId: rest.id,
                                                              restCategoryId:
                                                                category.id,
                                                            });
                                                            setOpenModalFn(
                                                              true,
                                                            );
                                                          }}
                                                          allData={likeItem}
                                                          itemId={item.id}
                                                          uriImage={item.image}
                                                          titleItem={item.name}
                                                          priceItem={item.price}
                                                          amount={
                                                            item.amountInCart
                                                          }
                                                          isFavorite={
                                                            item.isFavorite
                                                          }
                                                          displayLike={true}
                                                          dataForPost={item}
                                                          pressPlusModal={product => {
                                                            onChangeAmountHandle(
                                                              product.id,
                                                              'plus',
                                                              product.restId,
                                                              product.restCategoryId,
                                                            );
                                                          }}
                                                          pressMinusModal={product => {
                                                            onChangeAmountHandle(
                                                              product.id,
                                                              'minus',
                                                              product.restId,
                                                              product.restCategoryId,
                                                            );
                                                          }}
                                                          pressPrice={() => {
                                                            onChangeAmountHandle(
                                                              item.id,
                                                              'add',
                                                              rest.id,
                                                              category.id,
                                                            );
                                                          }}
                                                          onPressPlus={() => {
                                                            onChangeAmountHandle(
                                                              item.id,
                                                              'plus',
                                                              rest.id,
                                                              category.id,
                                                            );
                                                          }}
                                                          onPressMinus={() => {
                                                            onChangeAmountHandle(
                                                              item.id,
                                                              'minus',
                                                              rest.id,
                                                              category.id,
                                                            );
                                                          }}
                                                        />
                                                      );
                                                    },
                                                  )}
                                                </>
                                              )
                                            );
                                          })}
                                        </View>
                                      </View>
                                    </>
                                  )}
                                </>
                              );
                            })
                          : allRestraunt?.map((item, index) => {
                              return (
                                <View
                                  key={index + 1}
                                  style={{ marginBottom: 25 }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      getDataAllCartFn(asyncToken);
                                      setSingleRestrauntFn(item);
                                      getDataAllMenuItemByRestrauntFn(
                                        { id: item.id },
                                        asyncToken,
                                      );
                                      setTimeout(() => {
                                        navigation.navigate(
                                          'RestrauntMenuScreen',
                                          { item },
                                        );
                                      }, 500);
                                    }}
                                    style={styles.restrauntContainer}>
                                    <View style={styles.logoRestraunt}>
                                      <Image
                                        style={styles.imageContainerStyle}
                                        source={{ uri: item?.image }}
                                      />
                                    </View>
                                    <View style={styles.bottomElement}>
                                      <Text style={styles.generalDistanceText}>
                                        {item.name}{' '}
                                      </Text>
                                      <Text style={styles.distanceText}>
                                        (~{item.distance} {item.distanceType})
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                  <View style={styles.subElementContainer}>
                                    <View style={styles.subElement}>
                                      <Text style={styles.elementText}>
                                        {item.type === 'stationary'
                                          ? 'Restaurant'
                                          : item.type
                                              .slice(0, 1)
                                              .toUpperCase() +
                                            item.type.slice(
                                              1,
                                              item.type.length,
                                            )}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              );
                            })}
                      </>
                    )}
                  </View>
                </ScrollView>
                {(resCheck
                  .map(item => item.some(item1 => item1 !== 0))
                  .some(item => item !== false) &&
                  itemMenu === 'Favorites') ||
                  (allCartItem.length !== 0 && itemMenu === 'Favorites' && (
                    <View style={styles.buttonCartContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          getDataAllCartFn(asyncToken);
                          setCartLoadFn(true);
                          setTimeout(() => {
                            setNavigationRouteFn(false);
                            navigation.navigate('CartScreen');
                          }, 500);
                        }}
                        style={styles.buttonContainerCart}>
                        <Text style={styles.mainTextView}>View cart</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          postDataDeleteAllItemFromCartFn(asyncToken);
                          setTimeout(() => {
                            getDataAllFavoritesItemFn(asyncToken);
                            getDataAllCartFn(asyncToken);
                          }, 100);
                        }}
                        style={styles.buttonContainerDelete}>
                        <TrashIcon />
                      </TouchableOpacity>
                    </View>
                  ))}
              </>
            )}
            {asyncRole === 'courier' && (
              <View style={styles.containerMap}>
                {location && (
                  <MapView
                    ref={mapRef}
                    style={styles.mapStyle}
                    provider={PROVIDER_GOOGLE}
                    userInterfaceStyle="dark"
                    moveOnMarkerPress={true}
                    mapType="standard"
                    showsMyLocationButton={true}
                    initialRegion={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    loadingEnabled={true}
                    loadingIndicatorColor="#A21C14"
                    showsCompass={true}
                    userLocationPriority="high"
                    userLocationUpdateInterval={5000}
                    followsUserLocation={true}
                    showsUserLocation={true}>
                    {/* <Marker coordinate={location}>
                      <UserLocationIcon />
                    </Marker> */}
                    <Marker coordinate={location}>
                      <DriverIcon />
                    </Marker>
                  </MapView>
                )}
              </View>
            )}
            <ModalContact
              visible={contact}
              pressLastOrder={() => {
                setVisibleContactFn(false);
                navigation.navigate('LastOrderQuestin');
              }}
              pressAnotherQuestio={() => {
                setVisibleContactFn(false);
                navigation.navigate('AnotherQuestion');
              }}
              pressCancel={() => {
                setVisibleContactFn(false);
              }}
            />
            <ModalAddFullInfo
              visible={modalFullInfo}
              onPressAdd={() => {
                setModalFullInfoFn(false);
                navigation.navigate('EditProfile');
              }}
              onPressCancel={() => {
                setModalFullInfoFn(false);
              }}
            />
            {asyncRole === 'courier' && (
              <ModalKYCVerify
                visible={verifyKYC}
                onPressOkey={handleKYCVerify}
              />
            )}
            {asyncRole === 'courier' && <DriverConfirmedModal />}
          </>
        )}
        {asyncRole === 'courier' && (
          <>
            <ModalStartWork
              visible={startWorkModal}
              pressCancel={() => {
                setStartWorkModalFn(false);
              }}
              pressStart={() => {
                sendFcmToken();
                postDataStartWorkFn(asyncToken);
                setStartWorkModalFn(false);
              }}
            />
            <ModalEndWork
              visible={endWorkModal}
              pressCancel={() => {
                setEndWorkModalFn(false);
              }}
              pressFinish={() => {
                setEndWorkModalFn(false);
                postDataStopWorkFn(asyncToken);
              }}
            />
            <ModalOrderDriver
              allData={allDetailInfo}
              visible={orderModal}
              pressCancel={() => {
                setOrderModal(false);
                postDataRejectOrderFn({ id: orderId }, asyncToken);
              }}
              acceptButton={() => {
                setOrderModal(false);
                postDataAcceptOrderFn({ id: orderId }, asyncToken);
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
