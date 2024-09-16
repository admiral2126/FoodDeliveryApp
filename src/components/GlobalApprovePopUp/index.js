import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const GlobalApprovePopUp = ({
  visible,
  pressCancel,
  pressApprove,
  infoText,
  textApprove,
  textCancel,
  textSize,
}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.modalCancelContainer}>
        <View style={styles.cancelContainer}>
          <Text
            style={[
              styles.headerTextModal,
              {
                fontSize: textSize ? 17 : 22,
              },
            ]}>
            {infoText}
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={pressApprove}>
              <Text style={styles.approveText}>{textApprove}</Text>
            </TouchableOpacity>
            {textCancel && (
              <TouchableOpacity
                style={styles.leaveButton}
                onPress={pressCancel}>
                <Text style={styles.leaveText}>{textCancel}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GlobalApprovePopUp;
