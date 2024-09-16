import React, {useState} from 'react';
import {View, Modal, Text, TouchableOpacity, Image} from 'react-native';

import styles from './style';

import IconDown from '../../assets/icons/svg-icons/IconDown';
import PlusIcon from '../../assets/icons/svg-icons/PlusIcon';
import Minus from '../../assets/icons/svg-icons/Minus';
import ArrowUpRed from '../../assets/icons/svg-icons/ArrowUpRed';
import RedHeartIcon from '../../assets/icons/svg-icons/RedHeartIcon';
import HeartIcon from '../../assets/icons/svg-icons/HeartIcon';

const ModalItemMenu = ({
  visible,
  pressCancel,
  allData,
  pressLikeModal,
  displayLike,
  disable,
  pressPlusModal,
  pressMinusModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dishInform = {
    kcal: {title: 'calories', value: allData?.kcal},
    proteins: {title: 'proteins', value: allData?.proteins},
    fats: {title: 'fats', value: allData?.fats},
    carbs: {title: 'carbs', value: allData?.carbs},
  };

  const isNullValue = data =>
    data.kcal !== null ||
    data.proteins !== null ||
    data.fats !== null ||
    data.carbs !== null;

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <TouchableOpacity onPress={pressCancel} style={styles.mainModal} />
      <View style={styles.containerInfoContent}>
        <View style={styles.imageAllContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.menuItemImage}
              source={{uri: allData?.image}}
            />
          </View>
          {!displayLike && (
            <TouchableOpacity
              disabled={disable}
              onPress={() => pressLikeModal()}
              style={styles.likeIcon}>
              {allData?.isFavorite ? <RedHeartIcon /> : <HeartIcon />}
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.titlePriceContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.burgerName}>{allData.name}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.burgerName}>$ {allData.price}</Text>
            </View>
          </View>
          <Text style={styles.textInfo} numberOfLines={3}>
            {allData.description}
          </Text>
          {isNullValue(allData) && (
            <View style={styles.containerButton}>
              <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                style={styles.moreInfoButton}>
                <Text style={styles.textButton}>More information</Text>
                {!isOpen ? <IconDown /> : <ArrowUpRed />}
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.dropContainer}>
            {isNullValue(allData) && isOpen && (
              <View style={styles.moreInfoContainer}>
                {Object.values(dishInform).map(
                  dish =>
                    dish.value !== null && (
                      <View
                        style={styles.tableItem}
                        key={dish.title + dish.value}>
                        <Text style={styles.numberUpStyle}>{dish.value}</Text>
                        <Text style={styles.numberBottomStyle}>
                          {dish.title}
                        </Text>
                      </View>
                    ),
                )}
              </View>
            )}
          </View>
          <View style={styles.containerBottomButtons}>
            <View style={styles.leftButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  pressMinusModal();
                }}>
                <Minus />
              </TouchableOpacity>
              <Text style={styles.valueStyle}>{allData?.amountInCart}</Text>
              <TouchableOpacity
                onPress={() => {
                  pressPlusModal();
                }}>
                <PlusIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalItemMenu;
