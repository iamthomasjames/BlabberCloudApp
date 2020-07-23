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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon3 from 'react-native-vector-icons/Feather';
import ButtonView from '../../Components/Button/Index';
import axios from 'axios';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

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
  const [filename, setFilename] = useState("");
  const [filelist,setFileList]=useState({});
  const [displayfillist,setDisplayFileList]=useState({});


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      console.log(jsonValue)
      navigation.navigate("FilesPage",{
        jsonvalues:jsonValue
      })
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }
  
  const onSubmitHandler = async () => {
    let random;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Blabber Storage Permission Needed!",
        message:
          "Blabber needs access to your storage " +
          "so you can store your voices",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the storage");
      
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
          const filenam = filename+'.mp3';
          const filepath = RNFetchBlob.fs.dirs.DownloadDir + '/' + filenam;
          const downloadAppUrl = url
  
          RNFetchBlob.config({
              addAndroidDownloads: {
                  useDownloadManager: true,
                  title: 'Great, download success',
                  description:'mp3 file will be download',
                  mime: 'application/vnd.android.package-archive',
                  // mime: 'image/jpeg',
                  // mediaScannable: true,
                  notification: true,
                  path: filepath
              }
          })
          .fetch('GET', downloadAppUrl)
          .then((res) => {
              // console.log('res.path ', res.path());
              console.log('res.path ', res.path());
              alert("Your file saved to"+res.path());
              random= Math.floor(Math.random() * 1000000000000);

              setFileList({...filelist,[random]: {
                name: filename,
                path: res.path()
                }})

                const storeData = async (value) => {
                  try {
                    const jsonValue = JSON.stringify(value)
                    await AsyncStorage.setItem('@storage_Key', jsonValue)
                  } catch (e) {
                    // saving error
                  }
                }
                storeData(filelist);
             // android.actionViewIntent(res.path(), 'application/vnd.android.package-archive');
          })
          .catch((err) => {
              alert('download error, err is', JSON.stringify(err));
          });
      } catch (err) {
        console.log(err);
      }


    } else {
      alert("Please allow the storage persmission to save files");
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

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="tomato" />
      <View
        style={{
          backgroundColor: 'tomato',
          paddingHorizontal: 10,
          paddingTop: 10,
        }}>
        <Icon
          name="menu-outline"
          size={30}
          color="white"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      </View>
      <View
        style={{
          height: height / 6,
          backgroundColor: 'tomato',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{alignItems: 'center', justifyContent: 'center', padding: 30}}>
          <Icon name="cash-outline" size={20} color="white" />
          <Text style={{color: 'white', fontSize: 10}}>1000+</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={{uri: photo}}
            style={{width: 50, height: 50, borderRadius: 30}}
          />
          <Text
            style={{alignSelf: 'center', fontWeight: 'bold', color: 'white'}}>
            {user}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            auth()
              .signOut()
              .then(() => navigation.navigate('Login'));
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 30,
            }}>
            <Icon name="log-out-outline" size={20} color="white" />
            <Text style={{alignSelf: 'center', color: 'white', fontSize: 10}}>
              LOGOUT
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
        <View style={{padding: 30}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
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
                  style={{...styles.openButton, backgroundColor: '#2196F3',marginTop:10}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    onSubmitHandler();
                  }}>
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <Text>ENTER YOUR TEXT</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setText({text})}
            value={text}
            style={{borderColor: 'black', borderWidth: 1, borderRadius: 10}}
          />
        </View>
        <View>
          <View style={{paddingHorizontal: 30}}>
            <Text>SELECT VOICE</Text>
            <DropDownPicker
              items={[
                {
                  label: 'Salli',
                  value: 'Salli',
                  icon: () => <Icon2 name="female" size={18} color="#900" />,
                },
                {
                  label: 'Joanna',
                  value: 'Joanna',
                  icon: () => <Icon2 name="female" size={18} color="#900" />,
                },
                {
                  label: 'Ivy',
                  value: 'Ivy',
                  icon: () => <Icon2 name="female" size={18} color="#900" />,
                },
                {
                  label: 'Kendra',
                  value: 'Kendra',
                  icon: () => <Icon2 name="female" size={18} color="#900" />,
                },
                {
                  label: 'Kimberly',
                  value: 'Kimberly',
                  icon: () => <Icon2 name="female" size={18} color="#900" />,
                },
                {
                  label: 'Matthew',
                  value: 'Matthew',
                  icon: () => <Icon2 name="male" size={18} color="#900" />,
                },
                {
                  label: 'Justin',
                  value: 'Justin',
                  icon: () => <Icon2 name="male" size={18} color="#900" />,
                },
                {
                  label: 'Joey',
                  value: 'Joey',
                  icon: () => <Icon2 name="male" size={18} color="#900" />,
                },
              ]}
              defaultValue={voice}
              containerStyle={{height: 40}}
              onOpen={() => {
                setVoiceOpen(true);
              }}
              onClose={() => {
                setVoiceOpen(false);
              }}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setVoice(item.value)}
            />
            {voiceopen ? null : (
              <View>
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
                    setLanguageOpen(true);
                  }}
                  onClose={() => {
                    setLanguageOpen(false);
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={(item) => setLanguage(item.value)}
                />
                {languageopen ? null : (
                  <View style={{marginTop: 30}}>
                    <View>
                    <ButtonView
                      title="PROCESS TO MP3"
                      color="tomato"
                      text="white"
                      onPress={()=>{
                        setModalVisible(true);
                      }}
                    />
                    </View>
                    <View style={{marginTop:10}}>
                    <ButtonView
                      title="SHOW YOUR FILES"
                      color="tomato"
                      text="white"
                      onPress={getData}
                    />
                    </View>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
  
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
  },
});
