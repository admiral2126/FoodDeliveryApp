import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './style';

import {useSelector} from 'react-redux';

import LeftArrow from '../../assets/icons/svg-icons/LeftArrow';
import TrashIcon from '../../assets/icons/svg-icons/TrashIcon';

const HeaderCart = ({navigatePress, navigationTitle, onPressDelete}) => {
  const {allCartItem} = useSelector(state => state.main);

  return (
    <View style={[styles.navigationContainer]}>
      <TouchableOpacity
        onPress={navigatePress}
        style={[styles.navigationButton]}>
        <LeftArrow />
      </TouchableOpacity>
      <View style={styles.navigationTextContainer}>
        <Text style={styles.navigationTitle}>{navigationTitle}</Text>
      </View>
      <View style={styles.navigationEdit}>
        {allCartItem.length != 0 ? (
          <TouchableOpacity onPress={onPressDelete}>
            <TrashIcon />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderCart;
