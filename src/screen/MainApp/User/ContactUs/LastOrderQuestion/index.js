/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';

import {useAction} from '../../../../../utils/utils';

import styles from './style';

import {
  getDataInfoLastOrder,
  setResLastOrder,
} from '../../../../../redux/actions/MainUserAction';

import BackNavigation from '../../../../../components/NavigationBack';
import MainButton from '../../../../../components/MainButton';

import PlusIcon from '../../../../../assets/icons/svg-icons/PlusIcon';
import CancelPhoto from '../../../../../assets/icons/svg-icons/CancelPhoto';
import NoneOrderIcon from '../../../../../assets/icons/svg-icons/NoneOrderIcon';
import LeftArrow from '../../../../../assets/icons/svg-icons/LeftArrow';
import ArrowRightRed from '../../../../../assets/icons/svg-icons/ArrowRightRed';
import {useRef} from 'react';

const LastOrderQuestin = ({navigation}) => {
  const [imageOpen, setImageOpen] = useState([]);
  const [input, setInput] = useState('');
  const [ident, setIdent] = useState(false);

  const {resLastOrder} = useSelector(state => state.main);

  // const getDataInfoLastOrderFn = useAction(getDataInfoLastOrder);
  // const setResLastOrderFn = useAction(setResLastOrder);

  const [xPosition, setXPosition] = useState(0);

  const scrollRef = useRef();

  const handleClick = actionToDo => {
    scrollRef.current.scrollTo({
      x: actionToDo === 'Plus' ? xPosition + 200 : xPosition - 200,
      animated: true,
    });
  };

  const handleScroll = e => {
    setXPosition(e.nativeEvent.contentOffset.x);
  };

  const deleteImage = imageName => {
    const newArr = imageOpen.filter(item => item.name !== imageName);
    setImageOpen(newArr);
  };

  const uploadImage = () => {
    try {
      const options = {
        noData: true,
        maxWidth: 600,
        maxHeight: 600,
        quality: 0.5,
      };
      launchImageLibrary(options, response => {
        if (response.assets[0].uri) {
          if (response.assets[0].fileSize > 5999999) {
            Alert.alert('File size is too large. Select another, please!');
          } else {
            const photo = {
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              uri:
                Platform.OS === 'android'
                  ? response.assets[0].uri
                  : response.assets[0].uri.replace('file://', ''),
            };
            setImageOpen([...imageOpen, photo]);
          }
        }
      });
    } catch (e) {
      console.log(e, 'error');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.safeArea} contentContainerStyle={{flexGrow: 1}}>
        <TouchableWithoutFeedback
          style={styles.safeArea}
          onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainContainer]}>
            <View>
              <StatusBar barStyle="dark-content" />
              <BackNavigation
                navigationTitle="Write your question here"
                navigatePress={() => {
                  setImageOpen([]);
                  setInput('');
                  navigation.goBack();
                  navigation.openDrawer();
                }}
              />
            </View>
            {resLastOrder.id ? (
              <>
                <View>
                  <Text style={styles.oderNumberHeader}>
                    Order № {resLastOrder.id}
                  </Text>
                  <View
                    style={{
                      height: 80,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '5%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        handleClick('Minus');
                      }}>
                      <LeftArrow />
                    </TouchableOpacity>
                    <ScrollView
                      ref={scrollRef}
                      horizontal={true}
                      onScroll={handleScroll}
                      nestedScrollEnabled
                      persistentScrollbar={false}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      style={{flex: 1, flexDirection: 'row'}}>
                      {resLastOrder?.items.map((item, index) => {
                        return (
                          <View key={index + 1} style={styles.imageContainer}>
                            <Image
                              style={styles.imageContainer}
                              source={{uri: item.image}}
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                    <TouchableOpacity
                      style={{
                        width: '5%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        handleClick('Plus');
                      }}>
                      <ArrowRightRed />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.totalAmountStyle}>
                    Total Amount: ${resLastOrder.totalPrice}
                  </Text>
                  <View style={styles.borderStyle} />
                </View>
                <Text style={styles.headerText}>
                  Your opinion will help us improve our work.
                </Text>
                <TextInput
                  value={input}
                  onChangeText={e => {
                    setInput(e);
                  }}
                  placeholder="Leave your comment here"
                  multiline={true}
                  maxLength={1000}
                  style={styles.textInput}
                />
                {input.length < 1 && ident && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorInput}>
                      Comment field not be empty
                    </Text>
                  </View>
                )}
                {imageOpen.length >= 1 ? (
                  <View style={styles.mainContainerWithImage}>
                    {imageOpen.map((item, index) => {
                      return (
                        <View key={index + 1} style={styles.imageAddContainer}>
                          <Image
                            style={styles.imageStyle}
                            source={{uri: item.uri}}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              deleteImage(item.name);
                            }}
                            style={styles.cancelPhotoButton}>
                            <CancelPhoto />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                    <TouchableOpacity
                      style={styles.smallPlusButton}
                      onPress={() => {
                        uploadImage();
                      }}>
                      <PlusIcon />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      uploadImage();
                    }}
                    style={styles.addAddressContainer}>
                    <View style={styles.contentAddContainer}>
                      <PlusIcon />
                      <Text style={styles.textButtonAdd}>Add photos</Text>
                    </View>
                  </TouchableOpacity>
                )}
                <View style={styles.buttonContainer}>
                  <MainButton
                    buttonText="Send"
                    onPress={() => {
                      setIdent(true);
                      if (input.length >= 1) {
                        navigation.goBack();
                        navigation.openDrawer();
                        setInput('');
                        setImageOpen([]);
                        setIdent(false);
                      }
                    }}
                  />
                </View>
              </>
            ) : (
              <View style={styles.noneContainer}>
                <NoneOrderIcon />
                <Text style={styles.noneText}>You have no orders</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LastOrderQuestin;
