import React from 'react';
import {View, Text} from 'react-native';

import styles from './style';

const HeaderText = ({title, subTitle, content, height, align}) => {
  return (
    <View
      style={[
        styles.headerTextContainer,
        {
          alignItems: content ? 'flex-start' : 'center',
          height: height ? 140 : 110,
        },
      ]}>
      <Text style={[styles.titleText, {textAlign: align ? 'left' : 'center'}]}>
        {title}
      </Text>
      <Text
        style={[styles.subTitleText, {textAlign: align ? 'left' : 'center'}]}>
        {subTitle}
      </Text>
    </View>
  );
};

export default HeaderText;
