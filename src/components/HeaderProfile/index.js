import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './style';

import LeftArrow from '../../assets/icons/svg-icons/LeftArrow';

const HeaderProfile = ({
  navigatePress,
  navigationTitle,
  onPress,
  button,
  backButton,
}) => {
  return (
    <View style={[styles.navigationContainer]}>
      <TouchableOpacity
        onPress={navigatePress}
        style={[styles.navigationButton]}>
        {backButton ? (
          <LeftArrow />
        ) : (
          <Text style={styles.backText}>Cancel</Text>
        )}
      </TouchableOpacity>
      <View style={styles.navigationTextContainer}>
        <Text style={styles.navigationTitle}>{navigationTitle}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.navigationEdit}>
        <Text style={styles.textButton}>{button}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderProfile;
