import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const ModalStartWork = ({visible, pressCancel, pressStart}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.modalCancelContainer}>
        <View style={styles.cancelContainer}>
          <Text style={styles.headerTextModal}>
            Do you want to start your work?
          </Text>
          <TouchableOpacity style={styles.buttonCancel} onPress={pressStart}>
            <Text style={styles.cancelText}>Yes, start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.leaveButton} onPress={pressCancel}>
            <Text style={styles.leaveText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalStartWork;
