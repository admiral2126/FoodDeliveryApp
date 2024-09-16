import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const ModalCancelOrder = ({visible, pressCancel, pressCancelOrder}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.modalCancelContainer}>
        <View style={styles.cancelContainer}>
          <Text style={styles.headerTextModal}>
            Do you want to cancel order?
          </Text>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={pressCancelOrder}>
            <Text style={styles.cancelText}>Yes, cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.leaveButton} onPress={pressCancel}>
            <Text style={styles.leaveText}>No, leave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCancelOrder;
