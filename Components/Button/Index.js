import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function App({title,color,image,onPress,text}) {
    return (
        
            <TouchableOpacity onPress={()=>{
                onPress()
            }} style={{backgroundColor:color,height:35,borderRadius:30,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                {image?
                  <Image source={image}
                  style={{width:30,height:30}}/>:null}
            
                <Text style={{color:text}}>{title}</Text>
            </TouchableOpacity>
            
        
    )
}

const styles = StyleSheet.create({})
