import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Button,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import SnackBar from 'react-native-snackbar-component';
import LottieView from 'lottie-react-native';

import Sound from 'react-native-sound';
export default function ShowFiles({route, navigation}) {
  const [filelist, setFileList] = useState({});
  const [visible, setVisible] = useState(false);

  let filepath = '/storage/emulated/0/BlabberApp';
  const getData = async () => {
    PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ], {
        title: 'Permission',
        message: 'We need your permission.',
      },
    )
      .then(async(permRes) => {

      if (permRes['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          permRes['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
            setVisible(true);
            try {
              var TRACK_FOLDER = RNFetchBlob.fs.dirs.SDCardDir + '/BlabberApp/';
              let files = await RNFetchBlob.fs.ls(TRACK_FOLDER)
              console.log(files);
              setFileList(files);
              setTimeout(() => {
                setVisible(false);
              }, 3000);
              console.log(filelist);
            } catch (error) {
              console.log(error);
            }
      }
      else {
        alert('Please allow the file permission to show the files');
      }

    })
  };
  useEffect(() => {
    const getData = async () => {
      PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ], {
          title: 'Permission',
          message: 'We need your permission.',
        },
      )
        .then(async(permRes) => {
  
        if (permRes['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
            permRes['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
              setVisible(true);
              try {
                var TRACK_FOLDER = RNFetchBlob.fs.dirs.SDCardDir + '/BlabberApp/';
                let files = await RNFetchBlob.fs.ls(TRACK_FOLDER)
                console.log(files);
                setFileList(files);
                setTimeout(() => {
                  setVisible(false);
                }, 3000);
                console.log(filelist);
              } catch (error) {
                console.log(error);
              }
        }
        else {
          alert('Please allow the file permission to show the files');
        }
  
      })
    };
    getData();

    return () => {
      console.log('shshs');
    };
  }, []);

  if (!filelist[0]) {
    return (
    <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
       <StatusBar backgroundColor="#3dadcc"  />
         <LottieView source={require('../../Assets/json/not-found.json')} autoPlay loop />
         <Text style={{marginTop:200}}>Not found any files</Text>
         <Button title="Refresh" onPress={()=>{
           getData()
         }}/>
    </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
         <StatusBar backgroundColor="#3dadcc" />
        <SnackBar
          visible={visible}
          textMessage="Data refreshed"
          actionHandler={() => {
            console.log('Data refreshed');
          }}
        />
        <View style={{padding: 20, flex: 1}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                getData();
              }}>
              <Icon name="refresh-circle" size={30} color="#3dadcc" />
            </TouchableOpacity>
          </View>
          <ScrollView>
          {filelist.map((name) => {
            return (
            
              <TouchableOpacity style={{marginTop:10}} onPress={()=>{
                const sound = new Sound(filepath + '/' + name, null, (error) => {
                  if (error) {
                    // do something
                    console.log(error);
                  }
                  // play when loaded
                  sound.play();
                });
                
              }}>
             
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 70,
                    padding: 10,
                    borderWidth:1,
                    borderRadius: 10,
                    elevation: 1,
                  }}
                  >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Icon
                        name="musical-notes-outline"
                        size={20}
                        color="#3dadcc"
                      />
                    </View>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Text>FileName: </Text>
                        <Text style={{color: 'grey'}}>{name}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 10}}>FilePath: </Text>
                        <Text style={{color: 'grey', fontSize: 11}}>
                          {filepath + '/' + name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Icon
                        name="chevron-forward-outline"
                        size={20}
                        color="black"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              
            );
          })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
