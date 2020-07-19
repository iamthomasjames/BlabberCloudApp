import React from 'react'
import { StyleSheet, Text, View,Dimensions, StatusBar, Image, Button } from 'react-native'
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Home({route, navigation}) {
    const {width,height}=Dimensions.get('window')
    const { user,email,photo,uid } = route.params;
    return (
        <View style={{flex:1}}>
            <StatusBar backgroundColor="tomato"/>
           <View style={{height:height/5,backgroundColor:'tomato',borderBottomLeftRadius:30,borderBottomRightRadius:30,flexDirection:'row',justifyContent:'space-between'}}>
               <View style={{alignItems:'center',justifyContent:'center'}}>
               <Icon name="rocket" size={30} color="#900" />
               </View>
               <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Image source={{uri:photo}} style={{width:50,height:50,borderRadius:30}}/>
                  <Text style={{alignSelf:"center",fontWeight:'bold',color:'white'}}>{user}</Text>
               </View>
               <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Image source={{uri:photo}} style={{width:50,height:50,borderRadius:30}}/>
                  <Text style={{alignSelf:"center",fontWeight:'bold',color:'white'}}>{user}</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({})
