import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './style';

import LeftArrow from '../../assets/icons/svg-icons/LeftArrow';

const BackNavigation = ({
  navigatePress,
  navigationTitle,
  editCredCard,
  pressEdit,
  saveChange,
  pressSave,
}) => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity onPress={navigatePress} style={styles.navigationButton}>
        <LeftArrow />
      </TouchableOpacity>
      <View style={styles.navigationTextContainer}>
        <Text style={styles.navigationTitle}>{navigationTitle}</Text>
      </View>
      {editCredCard && (
        <TouchableOpacity onPress={pressEdit}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      )}
      {saveChange && (
        <TouchableOpacity onPress={pressSave}>
          <Text style={styles.editText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BackNavigation;
