import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import Share from 'react-native-share';

import styles from './style';
import colors from '../../../../assets/colors/colors';

import { useAction } from '../../../../utils/utils';

import {
  getDataAllMenuItemByRestraunt,
  setLikeItem,
  setOpenModal,
  getDataMenuItemForCategory,
  setItemMenuByCategory,
  getDataFullRestrauntInfo,
  postDataAddFavoriteItem,
  postDataRemoveFavoriteItem,
  getDataAllCart,
  postDataDeleteAllItemFromCart,
  postDataSetItemMenuInCart,
  setCategoryIds,
  setCartLoad,
} from '../../../../redux/actions/MainUserAction';

import { setNavigationRoute } from '../../../../redux/actions/MainDriverAction';

import InfoIcon from '../../../../assets/icons/svg-icons/InfoIcon';
import TrashIcon from '../../../../assets/icons/svg-icons/TrashIcon';
import SearchIcon from '../../../../assets/icons/svg-icons/SearchIcon';
import NothingFind from '../../../../assets/icons/svg-icons/NothingFind';
import CancelGrave from '../../../../assets/icons/svg-icons/CancelGrave';
import HalfRightArrow from '../../../../assets/icons/svg-icons/HalfRightArrow';

import HeaderMenuRestraunt from '../../../../components/RestrauntHeaderNavigation';
import ModalInfo from '../../../../components/ModalInfo';
import MenuItem from '../../../../components/MenuItem';
import { useIsFocused } from '@react-navigation/native';

const RestrauntMenuScreen = ({ navigation }) => {
  const { asyncToken } = useSelector(state => state.auth);

  const {
    singleRestraunt,
    allMenuItem,
    likeItem,
    itemMenuByCategore,
    fullRestrauntInfo,
    allCartItem,
    categoryIds,
  } = useSelector(state => state.main);

  const setLikeItemFn = useAction(setLikeItem);
  const setOpenModalFn = useAction(setOpenModal);
  const setItemMenuByCategoryFn = useAction(setItemMenuByCategory);
  const getDataMenuItemForCategoryFn = useAction(getDataMenuItemForCategory);
  const getDataFullRestrauntInfoFn = useAction(getDataFullRestrauntInfo);
  const postDataAddFavoriteItemFn = useAction(postDataAddFavoriteItem);
  const postDataRemoveFavoriteItemFn = useAction(postDataRemoveFavoriteItem);
  const getDataAllCartFn = useAction(getDataAllCart);
  const postDataDeleteAllItemFromCartFn = useAction(
    postDataDeleteAllItemFromCart,
  );
  const postDataSetItemMenuInCartFn = useAction(postDataSetItemMenuInCart);
  const getDataAllMenuItemByRestrauntFn = useAction(
    getDataAllMenuItemByRestraunt,
  );
  const setCategoryIdsFn = useAction(setCategoryIds);
  const setCartLoadFn = useAction(setCartLoad);
  const setNavigationRouteFn = useAction(setNavigationRoute);

  const [modalInfo, setModalInfo] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getDataFullRestrauntInfoFn({ id: singleRestraunt.id }, asyncToken);
  }, [isFocused]);

  const modalInfoRes = fullRestrauntInfo?.info;

  let options = {
    message: singleRestraunt.shareableLink,
  };

  const handlePost = id => {
    const res = categoryIds;
    const indexOf = categoryIds.indexOf(id);
    if (indexOf > -1) {
      res.splice(indexOf, 1);
    } else {
      res.push(id);
    }
    getDataMenuItemForCategoryFn(
      { id: allMenuItem.id, menuCategories: res },
      asyncToken,
    );
  };

  const [finishMenuState, setFinishMenuState] = useState([]);
  const [finishSecondMenuState, setFinishSecondMenuState] = useState([]);
  const [disable, setDisable] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const checkCartFirst = finishMenuState?.map(item => item.amountInCart);
  const checkCartSecond = finishSecondMenuState?.map(item => item.amountInCart);

  useEffect(() => {
    const itemMenu = allMenuItem.MenuCategories?.map(item => item.MenuItems);
    const secondItemMenu = itemMenuByCategore.MenuCategories?.map(
      item => item?.MenuItems,
    );

    setFinishMenuState(Object.assign([], itemMenu?.flat()));
    setFinishSecondMenuState(Object.assign([], secondItemMenu?.flat()));
  }, [allMenuItem, itemMenuByCategore]);

  const onLikeHandle = id => {
    setDisable(true);
    const res = finishMenuState.map(item => {
      if (item.id === id) {
        if (item.isFavorite) {
          postDataRemoveFavoriteItemFn({ id: id }, asyncToken);
        } else {
          postDataAddFavoriteItemFn({ id: id }, asyncToken);
        }
        !disable && setLikeItemFn({ ...item, isFavorite: !item.isFavorite });
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    const resSec = finishSecondMenuState.map(item => {
      if (item.id === id) {
        if (item.isFavorite) {
          postDataRemoveFavoriteItemFn({ id: id }, asyncToken);
        } else {
          postDataAddFavoriteItemFn({ id: id }, asyncToken);
        }
        !disable && setLikeItemFn({ ...item, isFavorite: !item.isFavorite });
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    setTimeout(() => {
      setDisable(false);
    }, 100);
    setFinishMenuState(res);
    setFinishSecondMenuState(resSec);
  };

  const onChangeAmountHandle = (id, state, type) => {
    setDisable(true);
    const res = finishMenuState.map(item => {
      if (item.id === id) {
        if (state === 'plus' || state === 'add') {
          postDataSetItemMenuInCartFn(
            { id: id, amount: item.amountInCart + 1 },
            asyncToken,
          );
          setLikeItemFn({ ...item, amountInCart: item.amountInCart + 1 });
          return { ...item, amountInCart: item.amountInCart + 1 };
        } else if (state === 'minus') {
          postDataSetItemMenuInCartFn(
            { id: id, amount: item.amountInCart - 1 },
            asyncToken,
          );
          setLikeItemFn({
            ...item,
            amountInCart:
              item.amountInCart === 0
                ? item.amountInCart
                : item.amountInCart - 1,
          });
          return {
            ...item,
            amountInCart: item.amountInCart - 1,
          };
        }
      }
      return item;
    });

    const resSec = finishSecondMenuState.map(item => {
      if (item.id === id) {
        if (state === 'plus' || state === 'addTwo') {
          postDataSetItemMenuInCartFn(
            { id: id, amount: item.amountInCart + 1 },
            asyncToken,
          );
          setLikeItemFn({ ...item, amountInCart: item.amountInCart + 1 });
          return { ...item, amountInCart: item.amountInCart + 1 };
        } else if (state === 'minus') {
          postDataSetItemMenuInCartFn(
            { id: id, amount: item.amountInCart - 1 },
            asyncToken,
          );
          setLikeItemFn({
            ...item,
            amountInCart:
              item.amountInCart === 0
                ? item.amountInCart
                : item.amountInCart - 1,
          });
          return {
            ...item,
            amountInCart: item.amountInCart - 1,
          };
        }
      }
      return item;
    });
    if (allCartItem.length === 0 && type !== 'modal') {
      getDataAllCartFn(asyncToken);
    }
    setTimeout(() => {
      setDisable(false);
    }, 100);
    setFinishMenuState(res);
    setFinishSecondMenuState(resSec);
  };

  const [inputSearch, setInputSearch] = useState('');
  const InputValueLet = inputSearch.trim().toLocaleLowerCase();
  let filteredSymptoms = [];
  if (finishMenuState?.length > 0) {
    filteredSymptoms = finishMenuState?.filter(item => {
      return item.name.toLocaleLowerCase().match(InputValueLet);
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <View style={{ marginHorizontal: 16 }}>
          <HeaderMenuRestraunt
            navigatePress={() => {
              navigation.navigate('MainScreen');
              setItemMenuByCategoryFn({});
              setCategoryIdsFn([]);
            }}
            onSearchButton={() => {
              setSearchModal(true);
            }}
            onPressCart={() => {
              getDataAllCartFn(asyncToken);
              setCartLoadFn(true);
              setTimeout(() => {
                setNavigationRouteFn(true);
                navigation.navigate('CartScreen');
              }, 500);
            }}
            navigationTitle={singleRestraunt.name}
          />
        </View>
        <ScrollView style={styles.mainContentScroll}>
          <View style={styles.mainContentContainer}>
            <View style={styles.restrauntContainer}>
              <View style={styles.logoRestraunt}>
                <Image
                  style={styles.imageContainerStyle}
                  source={{ uri: allMenuItem?.image }}
                />
                <TouchableOpacity
                  onPress={() => {
                    Share.open(options).then(res => {
                      console.log(res);
                    });
                  }}
                  style={styles.shareContainer}>
                  <HalfRightArrow />
                </TouchableOpacity>
              </View>
              <View style={styles.bottomElement}>
                <Text style={styles.generalDistanceText}>
                  {singleRestraunt.name}
                </Text>
                <Text style={styles.distanceText}>
                  {' '}
                  (~{fullRestrauntInfo?.info?.distance}{' '}
                  {fullRestrauntInfo?.info?.distanceType})
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalInfo(true);
                  }}
                  style={{ marginLeft: 8 }}>
                  <InfoIcon />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.subElementContainer}>
              {allMenuItem.MenuCategories?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index + 1}
                    onPress={() => {
                      handlePost(item.id);
                    }}
                    style={[
                      styles.subElement,
                      {
                        backgroundColor: categoryIds.includes(item.id)
                          ? colors.buttonBackGroundColor
                          : colors.white,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.elementText,
                        {
                          color: categoryIds.includes(item.id)
                            ? colors.white
                            : colors.textDarkGrey,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={[
                styles.allMenuItemContainer,
                {
                  marginBottom:
                    allCartItem.length !== 0 ||
                    checkCartFirst?.some(item => item !== 0) ||
                    checkCartSecond?.some(item => item !== 0)
                      ? 80
                      : 0,
                },
              ]}>
              {finishSecondMenuState?.length !== 0
                ? finishSecondMenuState?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index + 1}
                        pressLike={() => {
                          onLikeHandle(item.id);
                        }}
                        pressItem={() => {
                          setLikeItemFn(item);
                          setOpenModalFn(true);
                        }}
                        uriImage={item.image}
                        titleItem={item.name}
                        priceItem={item.price}
                        isFavorite={item.isFavorite}
                        amount={item.amountInCart}
                        dataForPost={item}
                        allData={likeItem}
                        disable={disable}
                        pressLikeModal={product => {
                          onLikeHandle(product.id);
                        }}
                        pressPlusModal={product =>
                          onChangeAmountHandle(product.id, 'plus', 'modal')
                        }
                        pressMinusModal={product =>
                          onChangeAmountHandle(product.id, 'minus', 'modal')
                        }
                        pressPrice={() =>
                          onChangeAmountHandle(item.id, 'addTwo')
                        }
                        onPressPlus={() =>
                          onChangeAmountHandle(item.id, 'plus')
                        }
                        onPressMinus={() =>
                          onChangeAmountHandle(item.id, 'minus')
                        }
                      />
                    );
                  })
                : finishMenuState?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index + 1}
                        pressLike={() => {
                          onLikeHandle(item.id);
                        }}
                        pressItem={() => {
                          setLikeItemFn(item);
                          setOpenModalFn(true);
                        }}
                        itemId={item.id}
                        uriImage={item.image}
                        titleItem={item.name}
                        priceItem={item.price}
                        isFavorite={item.isFavorite}
                        amount={item.amountInCart}
                        dataForPost={item}
                        allData={likeItem}
                        pressLikeModal={product => onLikeHandle(product.id)}
                        pressPlusModal={product =>
                          onChangeAmountHandle(product.id, 'plus', 'modal')
                        }
                        pressMinusModal={product =>
                          onChangeAmountHandle(product.id, 'minus', 'modal')
                        }
                        pressPrice={() => onChangeAmountHandle(item.id, 'add')}
                        onPressPlus={() =>
                          onChangeAmountHandle(item.id, 'plus')
                        }
                        onPressMinus={() =>
                          onChangeAmountHandle(item.id, 'minus')
                        }
                      />
                    );
                  })}
            </View>
          </View>
        </ScrollView>
        {allCartItem.length !== 0 && (
          <View style={styles.buttonCartContainer}>
            <TouchableOpacity
              onPress={() => {
                getDataAllCartFn(asyncToken);
                setCartLoadFn(true);
                setTimeout(() => {
                  setNavigationRouteFn(true);
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
                  getDataAllMenuItemByRestrauntFn(
                    { id: allMenuItem.id },
                    asyncToken,
                  );
                  getDataMenuItemForCategoryFn(
                    { id: allMenuItem.id },
                    asyncToken,
                  );
                  getDataAllCartFn(asyncToken);
                }, 100);
                setCategoryIdsFn([]);
              }}
              style={styles.buttonContainerDelete}>
              <TrashIcon />
            </TouchableOpacity>
          </View>
        )}
        <ModalInfo
          visible={modalInfo}
          pressCancel={() => {
            setModalInfo(false);
          }}
          pressNone={() => {
            setModalInfo(true);
          }}
          resName={modalInfoRes?.name}
          resDistance={modalInfoRes?.distance}
          resDistanceType={modalInfoRes?.distanceType}
          eatType={singleRestraunt?.MenuCategories}
          state={modalInfoRes?.State.code}
          city={modalInfoRes?.name}
          street={modalInfoRes?.street}
          status={modalInfoRes?.isOpen}
          startTime={fullRestrauntInfo?.workingTime?.friday?.openAt}
          endTime={fullRestrauntInfo?.workingTime?.friday?.closeAt}
          description={modalInfoRes?.description}
        />
        <Modal
          animationType="slide"
          statusBarTranslucent={true}
          transparent={true}
          visible={searchModal}>
          <View style={styles.containerSearchModal}>
            <View style={styles.containerSearchMain}>
              <View style={styles.containerSearchHeader}>
                <View style={styles.inputContainer}>
                  <TextInput
                    maxLength={25}
                    style={styles.inputStyle}
                    value={inputSearch}
                    onChangeText={e => {
                      setInputSearch(e);
                    }}
                  />
                  <View style={styles.iconInputStyle}>
                    <SearchIcon />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setInputSearch('');
                    }}
                    style={styles.cancelGraveView}>
                    <CancelGrave />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setSearchModal(false)}>
                  <Text style={styles.textCancelModal}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
            {filteredSymptoms.length === 0 ? (
              <View style={styles.nothingInSearchContainer}>
                <NothingFind />
                <Text style={styles.nothingFindText}>
                  We can’t find anything for the query "
                  {inputSearch.slice(0, 10)}"
                </Text>
              </View>
            ) : (
              <View style={styles.itemSearchContainer}>
                {filteredSymptoms?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index + 1}
                      pressLike={() => {
                        onLikeHandle(item.id);
                      }}
                      pressItem={() => {
                        setLikeItemFn(item);
                        setOpenModalFn(true);
                      }}
                      itemId={item.id}
                      uriImage={item.image}
                      titleItem={item.name}
                      priceItem={item.price}
                      isFavorite={item.isFavorite}
                      amount={item.amountInCart}
                      dataForPost={item}
                      allData={likeItem}
                      pressLikeModal={product => onLikeHandle(product.id)}
                      pressPlusModal={product =>
                        onChangeAmountHandle(product.id, 'plus', 'modal')
                      }
                      pressMinusModal={product =>
                        onChangeAmountHandle(product.id, 'minus', 'modal')
                      }
                      pressPrice={() => onChangeAmountHandle(item.id, 'add')}
                      onPressPlus={() => onChangeAmountHandle(item.id, 'plus')}
                      onPressMinus={() =>
                        onChangeAmountHandle(item.id, 'minus')
                      }
                    />
                  );
                })}
              </View>
            )}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default RestrauntMenuScreen;
