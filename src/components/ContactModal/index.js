import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

import ArrowRightRed from '../../assets/icons/svg-icons/ArrowRightRed';

const ModalContact = ({
  navigation,
  visible,
  pressCancel,
  pressLastOrder,
  pressAnotherQuestio,
}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <TouchableOpacity
        onPress={pressCancel}
        style={styles.mainModal}></TouchableOpacity>
      <View style={styles.containerContentOrder}>
        <Text style={styles.headerCodeOrder}>Feedback</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={pressLastOrder}>
          <Text style={styles.textInButton}>Last order question</Text>
          <ArrowRightRed />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={pressAnotherQuestio}>
          <Text style={styles.textInButton}>Another question</Text>
          <ArrowRightRed />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalContact;
