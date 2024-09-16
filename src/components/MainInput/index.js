import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './style';

import colors from '../../assets/colors/colors';

const MainInput = ({
  placeholder,
  value,
  onChangeText,
  keyboard,
  label,
  editable,
  phone,
  maxLength,
  heightTrack,
  numberOfLines,
}) => {
  const {resProfile, asyncRole} = useSelector(state => state.auth);
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
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor:
            phone === true ? colors.buttonBackGroundColor : colors.white,
          height: heightTrack ? 108 : 64,
          borderColor:
            label === 'State' || label === 'City'
              ? asyncRole === 'courier' &&
                resProfile?.data?.user?.cityId === null &&
                resProfile?.data?.user?.stateId === null
                ? colors.buttonBackGroundColor
                : colors.white
              : null,
          borderWidth:
            label === 'State' || label === 'City'
              ? asyncRole === 'courier' &&
                resProfile?.data?.user?.cityId === null &&
                resProfile?.data?.user?.stateId === null
                ? 1
                : 0
              : null,
          paddingTop: label === 'Comment' ? 35 : 15,
        },
      ]}>
      <Text style={labelStyle}>{(isFocused || value) && label}</Text>
      <TextInput
        color="#322E2C"
        placeholderTextColor="#92877E"
        style={[
          styles.textInput,
          {
            paddingTop: isFocused || value ? (label !== 'Comment' ? 15 : 0) : 0,
            height: heightTrack ? 108 : 50,
            textAlignVertical: label === 'Comment' ? 'top' : null,
          },
        ]}
        placeholder={isFocused ? null : placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboard}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable}
        phone={phone}
        maxLength={maxLength}
        multiline={heightTrack}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

export default MainInput;
