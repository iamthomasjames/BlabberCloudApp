import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
export default function Home({route, navigation}) {
  const {width, height} = Dimensions.get('window');
  const {user, email, photo, uid} = route.params;
  const [text,setText]=useState();
  const [Salli,setSalli]=useState("black");
  const [Joanna,setJoanna]=useState("black");
  const [Ivy,setIvy]=useState("black");
  const [Matthew,setMatthew]=useState("black");

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="tomato" />
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
          <Icon name="cash-outline" size={30} color="white" />
          <Text style={{color: 'white'}}>1000+</Text>
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
        <View
          style={{alignItems: 'center', justifyContent: 'center', padding: 30}}>
          <Text
            onPress={() => {
              auth()
                .signOut()
                .then(() => navigation.navigate('Login'));
            }}
            style={{alignSelf: 'center', fontWeight: 'bold', color: 'white'}}>
            LOGOUT
          </Text>
        </View>
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
        <View style={{padding:30}}>
            <Text>ENTER YOUR TEXT</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setText({text})}
            value={text}
            style={{borderColor:"black",borderWidth: 1,borderRadius:10}}
          />
        </View>
        <View>
            <View style={{paddingHorizontal:30}}>
            <Text style={{paddingVertical:5}}>SELECT YOUR VOICE</Text>
            <View style={{flexDirection:"row"}}>
            <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
            <Icon2 name="female" size={20} color="white" style={{borderWidth:1,height:30,width:30,padding:5,borderRadius:30,backgroundColor:{Salli}}} />
            <Text>Salli</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
            <Icon2 name="female" size={20} color="blue" style={{borderWidth:1,height:30,width:30,padding:5,borderRadius:30,backgroundColor:{Joanna}}} />
            <Text>Joanna</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
            <Icon2 name="female" size={20} color="blue" style={{borderWidth:1,height:30,width:30,padding:5,borderRadius:30,backgroundColor:{Ivy}}} />
            <Text>Ivy</Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingHorizontal:20,backgroundColor:'red'}} onPress={()=>{
                setMatthew("#ffff");
                setIvy("black");
                setSalli("black");
                setJoanna("black");
            }}>
            <Icon2 name="male" size={20} color="blue" style={{borderWidth:1,height:30,width:30,padding:5,borderRadius:30,backgroundColor:{Matthew}}} />
            <Text>Matthew</Text>
            </TouchableOpacity>
            </View>
            
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
