import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ShowFiles({route, navigation}) {
  const [filelist, setFileList] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        setFileList(JSON.parse(jsonValue));
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{padding: 20, flex: 1}}>
        {Object.entries(filelist).map(([, {name, path}]) => {
          return (
            <View style={{flex: 1, marginTop: 10}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  height: 40,
                  padding: 10,
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                <View style={{alignItems:'center',justifyContent:"center"}}>
                    <Icon
                      name="musical-notes-outline"
                      size={20}
                      color="tomato"
                    />
                  </View>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text>FileName: </Text>
                      <Text style={{color: 'grey'}}>{name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize:10}}>FilePath: </Text>
                      <Text style={{color: 'grey', fontSize: 11}}>{path}</Text>
                    </View>
                  </View>
                  <View style={{alignItems:'center',justifyContent:"center"}}>
                    <Icon
                      name="chevron-forward-outline"
                      size={20}
                      color="black"
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
