import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {useSelector} from 'react-redux';

import * as dimensions from '../../dimensionConfig';

import styles from './style';
import colors from '../../assets/colors/colors';

import {useAction} from '../../utils/utils';
import {setOpenModal} from '../../redux/actions/MainUserAction';

import ModalItemMenu from '../ModalItemMenu';

import HeartIcon from '../../assets/icons/svg-icons/HeartIcon';
import RedHeartIcon from '../../assets/icons/svg-icons/RedHeartIcon';
import WhitePlus from '../../assets/icons/svg-icons/WhitePlus';
import WhiteMinus from '../../assets/icons/svg-icons/WhiteMinus';

const MenuItem = ({
  pressLike,
  titleItem,
  priceItem,
  pressItem,
  uriImage,
  isFavorite,
  pressLikeModal,
  allData,
  displayLike,
  disable,
  pressPrice,
  onPressMinus,
  onPressPlus,
  amount,
  pressPlusModal,
  pressMinusModal,
}) => {
  const {openModal} = useSelector(state => state.main);

  const setOpenModalFn = useAction(setOpenModal);

  return (
    <>
      <View
        style={[
          styles.containerMenuItem,
          {
            width: dimensions.width < 375 ? 156 : null,
          },
        ]}>
        <View style={styles.imageContainer}>
          <TouchableHighlight
            underlayColor={colors.borderGrey}
            onPress={pressItem}
            style={styles.touchImage}>
            <Image
              style={styles.menuItemImage}
              source={{
                uri: `${uriImage}`,
              }}
            />
          </TouchableHighlight>
          <View style={styles.containerLike}>
            <TouchableOpacity
              disabled={disable}
              onPress={pressLike}
              style={styles.favoritsButtonContainer}>
              {isFavorite ? <RedHeartIcon /> : <HeartIcon />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <Text numberOfLines={1} style={styles.titleText}>
              {titleItem}
            </Text>
          </View>
          {amount === 0 ? (
            <TouchableOpacity onPress={pressPrice} style={styles.button}>
              <Text style={styles.textInButton}>${priceItem}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.leftButtonContainer}>
              <TouchableOpacity
                disabled={disable}
                style={styles.buttonSec}
                onPress={onPressMinus}>
                <WhiteMinus />
              </TouchableOpacity>
              <Text style={styles.valueStyle}>{amount}</Text>
              <TouchableOpacity
                disabled={disable}
                style={styles.buttonSec}
                onPress={onPressPlus}>
                <WhitePlus />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <ModalItemMenu
        visible={openModal}
        pressCancel={() => setOpenModalFn(false)}
        allData={allData}
        disable={disable}
        displayLike={displayLike}
        pressLikeModal={() => {
          pressLikeModal(allData);
        }}
        pressPlusModal={() => {
          pressPlusModal(allData);
        }}
        pressMinusModal={() => {
          pressMinusModal(allData);
        }}
      />
    </>
  );
};

export default MenuItem;
