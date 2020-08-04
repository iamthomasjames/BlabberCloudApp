import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  Button,
  Linking,
  BackHandler
} from 'react-native';
import HeaderView from '../../Components/Header/Index';
import Icon from 'react-native-vector-icons/';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function Tutorial({navigation}) {
  const {width, height} = Dimensions.get('window');

  useEffect(()=>{
    const backAction = () => {
       navigation.goBack();
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
  
      return () => backHandler.remove();
  },[])
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderView text="TUTORIALS" navigation={navigation}/>
      <View style={{height: height / 3, paddingHorizontal: 20}}>
        <Image
          source={require('../../Assets/Images/tutorial.webp')}
          style={{width: null, height: null, flex: 1, resizeMode: 'contain'}}
        />
      </View>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text style={{fontWeight: '700'}}>LIST OF TUTORIALS</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        <View style={{height: 100, marginTop: 5,flexDirection:'row'}}>
            <ScrollView
            horizontal={true}
            >
          <ImageBackground
            source={require('../../Assets/Images/customers.png')}
            blurRadius={2}
            style={{height: 100, width: width / 2, backgroundColor: 'tomato'}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={{width: null, height: 50,alignItems:'center'}}>
                <Text style={{fontWeight:"700",fontSize:10,color:'white'}}>INDRODUCTION TO BLABBER CLOUD</Text>
              </View>

              <View style={{width: null, }} />
              <View style={{width: null, padding:10,flexDirection:'row',justifyContent:'space-between'}} >
                  <View style={{flexDirection:'row'}}>
                  <Image source={require('../../Assets/Images/heart.png')}
                 style={{width:20,height:20}}
                 />
                 <Text style={{marginLeft:2,fontSize:13,fontWeight:'700',color:'white'}}>2.5K</Text>
                  </View>
                  <TouchableOpacity onPress={()=>{
                       const URL = 'https://google.com';
                       Linking.openURL(URL).catch((err) =>
                         console.error('An error occurred', err),
                       );
                  }}>
                  <View style={{width:60,height:25,borderColor:'black',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{fontSize:13,fontWeight:'700',color:'black'}}>VIEW</Text>
                  </View>
                  </TouchableOpacity>
                  </View>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../../Assets/Images/tutorial-2.jpeg')}
            blurRadius={2}
            style={{height: 100, width: width / 2, backgroundColor: 'tomato',marginLeft:5}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={{width: null, height: 50,alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontWeight:"700",fontSize:10,color:'white'}}>HOW TO ADD CONTENT USING BLABBER CLOUD</Text>
              </View>

              <View style={{width: null, }} />
              <View style={{width: null, padding:10,flexDirection:'row',justifyContent:'space-between'}} >
                  <View style={{flexDirection:'row'}}>
                  <Image source={require('../../Assets/Images/heart.png')}
                 style={{width:20,height:20}}
                 />
                 <Text style={{marginLeft:2,fontSize:13,fontWeight:'700',color:'white'}}>4.7K</Text>
                  </View>
                  <TouchableOpacity onPress={()=>{
                       const URL = 'https://google.com';
                       Linking.openURL(URL).catch((err) =>
                         console.error('An error occurred', err),
                       );
                  }}>
                  <View style={{width:60,height:25,borderColor:'black',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{fontSize:13,fontWeight:'700',color:'white'}}>VIEW</Text>
                  </View>
                  </TouchableOpacity>
                  </View>
            </View>
          </ImageBackground>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
