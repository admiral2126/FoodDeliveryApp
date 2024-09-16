import React from 'react';
import {View, Modal, StatusBar} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import styles from './style';

const ModalPicker = ({visible, content, scroll}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={false}
      presentationStyle="pageSheet"
      visible={visible}>
      {scroll ? (
        <ScrollView style={styles.mainScroll}>
          <View style={styles.containerInfoContent}>{content()}</View>
        </ScrollView>
      ) : (
        <View style={styles.mainScroll}>
          <View style={styles.containerInfoContent}>{content()}</View>
        </View>
      )}
    </Modal>
  );
};

export default ModalPicker;
