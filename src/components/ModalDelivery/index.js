import React, {useState} from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';

import styles from './style';

import * as dimensions from '../../dimensionConfig';

const ModalDelivery = ({visible, pressCancel, content}) => {
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <TouchableOpacity
        onPress={pressCancel}
        style={styles.mainModal}></TouchableOpacity>
      <View
        style={[
          styles.containerContentOrder,
          {
            height: dimensions.height < 700 ? 500 : 650,
          },
        ]}>
        {content()}
      </View>
    </Modal>
  );
};

export default ModalDelivery;
