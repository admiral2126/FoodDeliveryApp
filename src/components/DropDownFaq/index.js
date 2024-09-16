import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useSelector} from 'react-redux';

import styles from './style';

import ArrowFaqDown from '../../assets/icons/svg-icons/ArrowFaqDown';
import ArrowFaqUp from '../../assets/icons/svg-icons/ArrowFaqUp';

const DropDownFaq = () => {
  const {allFaq} = useSelector(state => state.driver);

  const [open, setOpen] = useState('');

  return (
    <View style={[styles.viewDropDownView]}>
      {allFaq?.data?.rows.map((item, index) => {
        return (
          <>
            <TouchableOpacity
              key={index + 1}
              onPress={() => {
                open === item.id ? setOpen('') : setOpen(item.id);
              }}
              style={styles.headerDrop}>
              <View style={styles.textLeftContainer}>
                <Text style={styles.textHeader}>{item.q}</Text>
              </View>
              <View style={styles.rightContainerArrow}>
                {open != item.id ? <ArrowFaqDown /> : <ArrowFaqUp />}
              </View>
            </TouchableOpacity>
            {open == item.id && (
              <>
                <View style={styles.openViewText}>
                  <Text style={styles.textOpenDrop}>{item.a}</Text>
                  <View style={styles.bottomLine}></View>
                </View>
              </>
            )}
          </>
        );
      })}
    </View>
  );
};

export default DropDownFaq;
