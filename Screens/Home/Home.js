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
import firestore from '@react-native-firebase/firestore';
import {
  hiIN,
  enIn,
  enAU,
  enGB,
  enGBWLS,
  esES,
  esMX,
  esUS,
  frCA,
  frFR,
  isIS,
  itIT,
  cmnCN,
} from '../../Constants/VoiceArray/Index';

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
  const [modalVisible2, setModalVisible2] = useState(false);
  const [filename, setFilename] = useState('');
  const [filelist, setFileList] = useState({});
  const [displayfillist, setDisplayFileList] = useState({});
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [LangValue, setLangValue] = useState();
  const [firebaseTextCount, setFirebaseTextCount] = useState();

  const onSubmitHandler = async () => {
    if (firebaseTextCount >= text.text.length) {
      if (text.text.length <= 2900) {
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
                language: language,
              },
            );

            const url = response.data;
            firestore()
              .collection('Users')
              .doc(uid)
              .update({
                totalcount: firebaseTextCount-text.text.length
              })
              .then(() => {
                console.log('User updated!');
              });
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
      } else {
        alert(
          'Your words limit exceeded please reduce your word count and try again!!',
        );
        setText('');
        setVoice('');
        setFilename('');
      }
    } else {
      alert(
        'Oops your wallet balance is very low please recharge and try again!',
      );
      setText('');
      setVoice('');
      setFilename('');
    }
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

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot((documentSnapshot) => {
        console.log('User data: ', documentSnapshot.data());
        setFirebaseTextCount(documentSnapshot.data().totalcount);
        console.log('count: ', firebaseTextCount);
      });

    // Stop listening for updates when no longer required
  }, [uid]);

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
            height: height / 8,
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
            <Text style={{color: 'white', fontSize: 10}}>
              {firebaseTextCount ? firebaseTextCount : 0}
            </Text>
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
          </View>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible2}
              onRequestClose={() => {}}>
              <View style={styles.centeredView}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        borderRadius: 10,
                        backgroundColor: 'white',
                        padding: 10,
                        marginHorizontal: 10,
                      }}>
                      <View style={{alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: 20,
                            padding: 5,
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: 'tomato',
                          }}>
                          Your Balance is too low!!
                        </Text>
                      </View>
                      <View style={{alignItems: 'flex-end'}}>
                        <LottieView
                          source={require('../../Assets/json/recharge.json')}
                          autoPlay
                          loop
                          style={{width: 150, height: 170}}
                        />
                      </View>
                      <View
                        style={{alignItems: 'center', paddingHorizontal: 15}}>
                        <View
                          style={{
                            borderBottomColor: 'red',
                            borderBottomWidth: 1,
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: 'yellow',
                            padding: 5,
                            borderRadius: 10,
                          }}>
                          <Text style={{textAlign: 'center'}}>
                            Unfortunately you are exceeded the maximum free
                            limit of using the Blabber TTS service. Please
                            recharge the coin wallet and enjoy the service.
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{marginTop: 10}}
                          onPress={() => {
                            navigation.navigate('Recharge');
                          }}>
                          <Button title="RECHARGE NOW!" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          {dropdownVisible ? (
            <View
              style={{
                height: 70,
                backgroundColor: 'gold',
                justifyContent: 'center',
                borderRadius: 10,
                marginHorizontal: 15,
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
                    style={{color: 'black', textDecorationLine: 'underline'}}>
                    .,?!-[]()
                  </Text>{' '}
                  can help you to tweak the speech modulation.
                </Text>
              </View>
            </View>
          ) : null}

          <View style={{marginTop: 10, marginHorizontal: 15}}>
            <Text>ENTER YOUR TEXT</Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) => setText({text})}
              value={text}
              style={{borderColor: 'black', borderWidth: 1, borderRadius: 10}}
            />
          </View>

          <View>
            <View style={{paddingHorizontal: 15}}>
              <Text>Select Language</Text>
              <DropDownPicker
                items={[
                  {
                    label: 'English India',
                    value: 'en-IN',
                    langValue: 'enIn',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/india.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'English Australia',
                    value: 'en-AU',
                    langValue: 'enAU',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/australia.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'English British',
                    value: 'en-GB',
                    langValue: 'enGB',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/british-virgin-islands.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'English Wales',
                    value: 'en-GB-WLS',
                    langValue: 'enGBWLS',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/wales.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'Spanish Spain',
                    value: 'es-ES',
                    langValue: 'esES',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/spain.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'Spanish Mexico',
                    value: 'es-MX',
                    langValue: 'esMX',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/mexico.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'Spanish US',
                    value: 'es-US',
                    langValue: 'esUS',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/usa-today.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'French Canada',
                    value: 'fr-CA',
                    langValue: 'frCA',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/canada.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'French France',
                    value: 'fr-FR',
                    langValue: 'frFR',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/france.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'Icelandic Iceland',
                    value: 'is-IS',
                    langValue: 'isIS',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/iceland.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'Italian Italy',
                    value: 'it-IT',
                    langValue: 'itIT',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/italy.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'Hindi India',
                    value: 'hi-IN',
                    langValue: 'hiIN',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/india.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
                  },
                  {
                    label: 'Chinese China',
                    value: 'cmn-CN',
                    langValue: 'cmnCN',
                    icon: () => (
                      <Image
                        source={require('../../Assets/Images/Flags/china.png')}
                        style={{width: 20, height: 20}}
                      />
                    ),
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
                onChangeItem={(item) => {
                  setLanguage(item.value);
                  setLangValue(item.langValue);
                }}
              />
              {voiceopen ? null : (
                <View>
                  <Text>SELECT VOICE</Text>
                  <DropDownPicker
                    items={
                      LangValue === 'hiIN'
                        ? hiIN
                        : LangValue === 'enIn'
                        ? enIn
                        : LangValue === 'enAU'
                        ? enAU
                        : LangValue === 'enGB'
                        ? enGB
                        : LangValue === 'enGBWLS'
                        ? enGBWLS
                        : LangValue === 'esMX'
                        ? esMX
                        : LangValue === 'frCA'
                        ? frCA
                        : LangValue === 'frFR'
                        ? frFR
                        : LangValue === 'isIS'
                        ? isIS
                        : LangValue === 'itIT'
                        ? itIT
                        : LangValue === 'cmnCN'
                        ? cmnCN
                        : LangValue === 'esES'
                        ? esES
                        : LangValue === 'esUS'
                        ? esUS
                        : []
                    }
                    onOpen={() => {
                      setDropdownVisible(false);
                    }}
                    onClose={() => {
                      setDropdownVisible(true);
                    }}
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
                              if (firebaseTextCount >= 25) {
                                setModalVisible(true);
                              } else {
                                setModalVisible2(true);
                              }
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
