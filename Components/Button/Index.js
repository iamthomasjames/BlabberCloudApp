import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function App({title,color,image,onPress}) {
    return (
        <View style={{flex:1}}>
            <TouchableOpacity onPress={()=>{onPress().then(()=>{console.log('done')})}} style={{backgroundColor:color,height:35,borderRadius:30,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                {image?
                  <Image source={image}
                  style={{width:30,height:30}}/>:null}
            
              <Text>{title}</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({})
