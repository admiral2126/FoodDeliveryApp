import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import styles from './style';

import StarIcon from '../../assets/icons/svg-icons/StarIcon';
import colors from '../../assets/colors/colors';

const StarComponent = ({pressStar, number}) => {
  const starData = [
    {
      id: 1,
      status: false,
    },
    {id: 2, status: false},
    {id: 3, status: false},
    {id: 4, status: false},
    {id: 5, status: false},
  ];

  return (
    <View style={styles.containerStar}>
      {starData.map((item, index) => (
        <TouchableOpacity key={index + 1} onPress={() => pressStar(index + 1)}>
          <StarIcon
            color={
              number >= index + 1
                ? colors.buttonBackGroundColor
                : colors.borderGrey
            }
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarComponent;
