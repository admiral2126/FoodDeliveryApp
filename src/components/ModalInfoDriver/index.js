import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const ModalDriverInfo = ({visible, pressOkey, message}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.modalCancelContainer}>
        <View style={styles.cancelContainer}>
          <Text style={styles.headerTextModal}>{message}</Text>
          <TouchableOpacity style={styles.buttonCancel} onPress={pressOkey}>
            <Text style={styles.cancelText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDriverInfo;
