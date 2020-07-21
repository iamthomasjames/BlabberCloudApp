import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Button,
  BackHandler,
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon3 from 'react-native-vector-icons/Feather';
import ButtonView from '../../Components/Button/Index'

export default function Home({route, navigation}) {
  const {width, height} = Dimensions.get('window');
  const {user, email, photo, uid} = route.params;
  const [text, setText] = useState();
  const [Salli, setSalli] = useState('black');
  const [Joanna, setJoanna] = useState('black');
  const [Ivy, setIvy] = useState('black');
  const [Matthew, setMatthew] = useState('black');
  const [voice,setVoice]=useState('');
  const [language,setLanguage]=useState('');
  const [voiceopen,setVoiceOpen]=useState(false);
  const [languageopen,setLanguageOpen]=useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="tomato" />
      <View style={{  backgroundColor: 'tomato',paddingHorizontal:10,paddingTop:10}}>
      <Icon name="menu-outline" size={30} color="white" onPress={()=>{
        navigation.openDrawer()
      }} />
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
          <Text style={{color: 'white',fontSize:10}}>1000+</Text>
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
        <TouchableOpacity onPress={() => {
              auth()
                .signOut()
                .then(() => navigation.navigate('Login'));
            }}>
        <View
          style={{alignItems: 'center', justifyContent: 'center', padding: 30}}>
             <Icon name="log-out-outline" size={20} color="white" />
          <Text
            style={{alignSelf: 'center', color: 'white',fontSize:10}}>
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
                }
              ]}
              defaultValue={voice}
              containerStyle={{height: 40}}
              onOpen={()=>{setVoiceOpen(true)}}
              onClose={()=>{setVoiceOpen(false)}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) =>
                setVoice(item.value)
              }
            />
            {voiceopen?null:
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
              onOpen={()=>{setLanguageOpen(true)}}
              onClose={()=>{setLanguageOpen(false)}}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) =>
                setLanguage(item.value)
              }
            />
            {languageopen?null: <View style={{marginTop:30}}>
            <ButtonView title="PROCESS TO MP3" color="tomato" text="white"/>
            </View>}
           
             </View>
            }
           
           
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
