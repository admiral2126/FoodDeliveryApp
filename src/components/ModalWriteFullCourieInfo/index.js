import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const ModalAddFullInfo = ({visible, onPressAdd, onPressCancel}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.modalApproveContainer}>
        <View style={styles.approveContainer}>
          <Text style={styles.headerTextModal}>
            Welcome on driver account you must add full info in your profile
          </Text>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonStyleSkip}
              onPress={onPressAdd}>
              <Text style={styles.textInButton}>Add Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyleSwap}
              onPress={onPressCancel}>
              <Text style={styles.textInButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddFullInfo;
