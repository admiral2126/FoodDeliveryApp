import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import styles from './style';

import BackNavigation from '../../../../components/NavigationBack';
import MainButton from '../../../../components/MainButton';

import PlusIcon from '../../../../assets/icons/svg-icons/PlusIcon';
import CancelPhoto from '../../../../assets/icons/svg-icons/CancelPhoto';

const ContactUsDriver = ({navigation}) => {
  const [imageOpen, setImageOpen] = useState([]);
  const [input, setInput] = useState('');
  const [ident, setIdent] = useState(false);

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
            <Text style={styles.headerText}>
              Your opinion will help us improve our work.
            </Text>
            <TextInput
              value={input}
              placeholder="Leave your comment here"
              multiline={true}
              maxLength={1000}
              style={styles.textInput}
              onChangeText={e => {
                setInput(e);
              }}
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
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUsDriver;
