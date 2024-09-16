import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './style';

import RightArrow from '../../assets/icons/svg-icons/RightArrow';

const ButtonChoseClass = ({title, subTitle, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.textArrowContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <RightArrow />
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitleText}>{subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonChoseClass;
