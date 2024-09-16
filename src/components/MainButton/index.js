import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const MainButton = ({onPress, buttonText}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainButtonContainer}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default MainButton;
