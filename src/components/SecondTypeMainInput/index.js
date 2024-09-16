import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './style';

const SecondInput = ({
  placeholder,
  value,
  onChangeText,
  keyboard,
  label,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = {
    position: 'absolute',
    left: 0,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 15,
    fontSize: 12,
    color: '#92877E',
    paddingTop: 11,
    paddingLeft: 20,
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={labelStyle}>{isFocused || value ? label : null}</Text>
      <TextInput
        color="#322E2C"
        placeholderTextColor="#92877E"
        style={[
          styles.textInput,
          {
            paddingTop: isFocused || value ? 15 : 0,
            textAlignVertical: label === 'Comment' ? 'top' : null,
          },
        ]}
        placeholder={isFocused ? null : placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboard}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
      />
    </View>
  );
};

export default SecondInput;
