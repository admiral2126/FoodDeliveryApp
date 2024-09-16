import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './style';

import LeftArrow from '../../assets/icons/svg-icons/LeftArrow';
import SearchIcon from '../../assets/icons/svg-icons/SearchIcon';

import CartComponent from '../CartComponent';

const HeaderMenuRestraunt = ({
  navigatePress,
  navigationTitle,
  onSearchButton,
  onPressCart,
}) => {
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
        <TouchableOpacity onPress={onSearchButton}>
          <SearchIcon />
        </TouchableOpacity>
        <CartComponent onPress={onPressCart} />
      </View>
    </View>
  );
};

export default HeaderMenuRestraunt;
