import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationHelpersContext } from '@react-navigation/native';

export default function HeaderView({text,navigation}) {
    const {width,height}=Dimensions.get("window");
    return (
        <View
        style={{
          height: height / 13,
          backgroundColor: '#3dadcc',
          justifyContent: 'center',
        }}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack();
                }}>
                <Icon name="arrow-back" size={30} color="white" style={{paddingLeft:5}}/>
                </TouchableOpacity>
          
        <Text
          style={{
            marginHorizontal: 5,
            fontSize: 15,
            fontWeight: 'bold',
            color: 'white',
          }}>
          {text}
        </Text>
            </View>
       

      </View>
    )
}

const styles = StyleSheet.create({})
