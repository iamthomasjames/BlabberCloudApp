import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Button,
  BackHandler,
  Alert,
  Modal,
  PermissionsAndroid,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon3 from 'react-native-vector-icons/Feather';
import ButtonView from '../../Components/Button/Index';
import axios from 'axios';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default function Home({route, navigation}) {
  const {width, height} = Dimensions.get('window');
  const {user, email, photo, uid} = route.params;
  const [text, setText] = useState();
  const [Salli, setSalli] = useState('black');
  const [Joanna, setJoanna] = useState('black');
  const [Ivy, setIvy] = useState('black');
  const [Matthew, setMatthew] = useState('black');
  const [voice, setVoice] = useState('');
  const [language, setLanguage] = useState('');
  const [voiceopen, setVoiceOpen] = useState(false);
  const [languageopen, setLanguageOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [filename, setFilename] = useState('');
  const [filelist, setFileList] = useState({});
  const [displayfillist, setDisplayFileList] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Blabber Storage Permission Needed!',
        message:
          'Blabber needs access to your storage ' +
          'so you can store your voices',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://us-central1-app-tts-engine.cloudfunctions.net/app/speech',
          {
            text: text.text,
            voice: voice,
          },
        );

        const url = response.data;
        console.log(url);
        const sound = new Sound(url, null, (error) => {
          if (error) {
            // do something
            console.log(error);
          }
          // play when loaded
          sound.play();
        });

        const android = RNFetchBlob.android;
        const filenam = 'BlabberCloud_' + filename + '.mp3';
        const filepath =
          RNFetchBlob.fs.dirs.SDCardDir + '/BlabberApp/' + filenam;
        const downloadAppUrl = url;
        RNFetchBlob.config({
          // response data will be saved to this path if it has access right.
          path: filepath,
          appendExt: 'mp3',
        })
          .fetch('GET', downloadAppUrl, {
            //some headers ..
          })
          .then((res) => {
            // the path should be dirs.DocumentDir + 'path-to-file.anything'
            console.log('The file saved to ', res.path());

            Alert.alert('File Saved!', 'Your file saved to' + res.path(), [
              {
                text: 'OK',
                onPress: () => null,
                style: 'cancel',
              },
            ]);
            setLoading(false);
            setModalVisible(false);
          });
        // RNFetchBlob.config({
        //   addAndroidDownloads: {
        //     useDownloadManager: true,
        //     title: 'Great, download success',
        //     description: 'mp3 file will be download',
        //     mime: 'application/vnd.android.package-archive',
        //     // mime: 'image/jpeg',
        //     // mediaScannable: true,
        //     notification: true,
        //     path: filepath,
        //   },
        // })
        //   .fetch('GET', downloadAppUrl)
        //   .then((res) => {
        //     // console.log('res.path ', res.path());
        //     console.log('res.path ', res.path());
        //     setModalVisible(false);
        //     Alert.alert('Saved!', 'Your file saved to' + res.path(), [
        //       {
        //         text: 'OK',
        //         onPress: () => null,
        //         style: 'cancel',
        //       },
        //     ]);
        //     random = Math.floor(Math.random() * 1000000000000);

        //     setFileList({
        //       ...filelist,
        //       [random]: {
        //         name: filename,
        //         path: res.path(),
        //       },
        //     });

        //     const storeData = async (value) => {
        //       try {
        //         const jsonValue = JSON.stringify(value);
        //         await AsyncStorage.setItem('@storage_Key', jsonValue);
        //       } catch (e) {
        //         // saving error
        //       }
        //     };
        //     storeData(filelist);
        //     setLoading(false);
        //     // android.actionViewIntent(res.path(), 'application/vnd.android.package-archive');
        //   })
        //   .catch((err) => {
        //     alert('download error, err is', JSON.stringify(err));
        //     console.log(err);
        //     setLoading(false);
        //   });
      } catch (err) {
        console.log(err);
        setModalVisible(false);
        setLoading(false);
      }
    } else {
      alert('Please allow the storage persmission to save files');
    }
    setText('');
    setVoice('');
    setFilename('');
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#3dadcc',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            padding: 30,
          }}>
          <LottieView
            source={require('../../Assets/json/loading.json')}
            autoPlay
            loop
          />
          <View style={{marginTop: 140}}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: 20,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              Sit back and relax! We are prepairing your files
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#3dadcc" />
        <View
          style={{
            backgroundColor: '#3dadcc',
            paddingHorizontal: 10,
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Icon
              name="menu-outline"
              size={30}
              color="white"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              fontSize: 16,
              textTransform: 'uppercase',
            }}>
            Blabber Cloud
          </Text>
        </View>
        <View
          style={{
            height: height / 6,
            backgroundColor: '#3dadcc',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 30,
            }}>
            <Icon name="cash-outline" size={20} color="white" />
            <Text style={{color: 'white', fontSize: 10}}>1000+</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../Assets/Images/main.png')}
                style={{height: 40, width: 40, resizeMode: 'contain'}}
              />
            </View>

            {/* <Text
              style={{alignSelf: 'center', fontWeight: 'bold', color: 'white'}}>
              {user}
            </Text> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              alert('Yet to be added!!');
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 30,
              }}>
              <Icon name="key-outline" size={20} color="white" />
              <Text style={{alignSelf: 'center', color: 'white', fontSize: 10}}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          {/* <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Button title="logout" onPress={()=>{
                      auth()
                      .signOut()
                      .then(() => {console.log('User signed out!')
                    navigation.navigate("Login")
                    });
                  }}/>
               </View> */}
        </View>
        <View>
          <View style={{paddingHorizontal: 15, paddingTop: 15}}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {}}>
              <View style={styles.centeredView}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    width: width - 30,
                    elevation: 5,
                  }}>
                  <Text>ENTER YOUR FILE NAME</Text>
                  <TextInput
                    onChangeText={(text) => setFilename(text)}
                    value={filename}
                    style={{
                      borderColor: 'black',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  />

                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      backgroundColor: '#3dadcc',
                      marginTop: 10,
                    }}
                    onPress={() => {
                      onSubmitHandler();
                    }}>
                    <Text style={styles.textStyle}>SAVE</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      backgroundColor: 'black',
                      marginTop: 10,
                    }}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '700',
                      }}>
                      CANCEL
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

            <View
              style={{
                height: 70,
                backgroundColor: 'gold',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="information-circle" size={30} color="white" />

                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'black',
                    fontWeight: 'bold',
                    paddingRight: 25,
                  }}>
                  Using punctuations like{' '}
                  <Text
                    style={{color: 'black', fontWeight: 'bold',textDecorationLine:'underline'}}>
                    .,?!-[]()
                  </Text>{' '}
                  can help you to udjust the speech moducalation.
                </Text>
              </View>
            </View>

            <View>
              <Text>ENTER YOUR TEXT</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setText({text})}
                value={text}
                style={{borderColor: 'black', borderWidth: 1, borderRadius: 10}}
                
              />
            </View>
          </View>
          <View>
            <View style={{paddingHorizontal: 15}}>
              <Text>Select Language</Text>
              <DropDownPicker
                items={[
                  {
                    label: 'English',
                    value: 'English',
                    icon: () => <Icon2 name="flag" size={18} color="#900" />,
                  },
                ]}
                defaultValue={language}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                onOpen={() => {
                  setVoiceOpen(true);
                }}
                onClose={() => {
                  setVoiceOpen(false);
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item) => setLanguage(item.value)}
              />
              {voiceopen ? null : (
                <View>
                  <Text>SELECT VOICE</Text>
                  <DropDownPicker
                    items={[
                      {
                        label: 'Salli',
                        value: 'Salli',
                        icon: () => (
                          <Icon2 name="female" size={18} color="#900" />
                        ),
                      },
                      {
                        label: 'Joanna',
                        value: 'Joanna',
                        icon: () => (
                          <Icon2 name="female" size={18} color="#900" />
                        ),
                      },
                      {
                        label: 'Ivy',
                        value: 'Ivy',
                        icon: () => (
                          <Icon2 name="female" size={18} color="#900" />
                        ),
                      },
                      {
                        label: 'Kendra',
                        value: 'Kendra',
                        icon: () => (
                          <Icon2 name="female" size={18} color="#900" />
                        ),
                      },
                      {
                        label: 'Kimberly',
                        value: 'Kimberly',
                        icon: () => (
                          <Icon2 name="female" size={18} color="#900" />
                        ),
                      },
                      {
                        label: 'Matthew',
                        value: 'Matthew',
                        icon: () => (
                          <Icon2 name="male" size={18} color="#900" />
                        ),
                      },
                      {
                        label: 'Justin',
                        value: 'Justin',
                        icon: () => (
                          <Icon2 name="male" size={18} color="#900" />
                        ),
                      },
                      {
                        label: 'Joey',
                        value: 'Joey',
                        icon: () => (
                          <Icon2 name="male" size={18} color="#900" />
                        ),
                      },
                    ]}
                    defaultValue={voice}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={(item) => setVoice(item.value)}
                  />
                  {languageopen ? null : (
                    <View style={{marginTop: 10}}>
                      <View>
                        <ButtonView
                          title="PROCESS TO MP3"
                          color="#3dadcc"
                          text="white"
                          onPress={() => {
                            if (text && voice) {
                              setModalVisible(true);
                            } else {
                              alert('Please enter the details');
                            }
                          }}
                        />
                      </View>
                      <View style={{marginTop: 10}}></View>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {},
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
  },
});
