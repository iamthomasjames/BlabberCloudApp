import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Button,
  PermissionsAndroid,
  StatusBar,
  Dimensions,
  
} from 'react-native';
import Share from "react-native-share";

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import SnackBar from 'react-native-snackbar-component';
import LottieView from 'lottie-react-native';

import Sound from 'react-native-sound';
export default function ShowFiles({route, navigation}) {
  const {width, height} = Dimensions.get('window');
  const [filelist, setFileList] = useState({});
  const [visible, setVisible] = useState(false);
  let sound;
  let filepath = '/storage/emulated/0/BlabberApp';
  const getData = async () => {
    PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ],
      {
        title: 'Permission',
        message: 'We need your permission.',
      },
    ).then(async (permRes) => {
      if (
        permRes['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        permRes['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        setVisible(true);
        try {
          var TRACK_FOLDER = RNFetchBlob.fs.dirs.SDCardDir + '/BlabberApp/';
          let files = await RNFetchBlob.fs.ls(TRACK_FOLDER);
          console.log(files);
          setFileList(files);
          setTimeout(() => {
            setVisible(false);
          }, 3000);
          console.log(filelist);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('Please allow the file permission to show the files');
      }
    });
  };
  useEffect(() => {
    const getData = async () => {
      PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ],
        {
          title: 'Permission',
          message: 'We need your permission.',
        },
      ).then(async (permRes) => {
        if (
          permRes['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          permRes['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          setVisible(true);
          try {
            var TRACK_FOLDER = RNFetchBlob.fs.dirs.SDCardDir + '/BlabberApp/';
            let files = await RNFetchBlob.fs.ls(TRACK_FOLDER);
            console.log(files);
            setFileList(files);
            setTimeout(() => {
              setVisible(false);
            }, 3000);
            console.log(filelist);
          } catch (error) {
            console.log(error);
          }
        } else {
          alert('Please allow the file permission to show the files');
        }
      });
    };
    getData();

    return () => {
      console.log('shshs');
    };
  }, []);

  if (!filelist[0]) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar backgroundColor="#3dadcc" />
        <LottieView
          source={require('../../Assets/json/not-found.json')}
          autoPlay
          loop
        />
        <Text style={{marginTop: 200}}>Not found any files</Text>
        <Button
          title="Refresh"
          onPress={() => {
            getData();
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#ebebeb'}}>
        <StatusBar backgroundColor="#3dadcc" />
        <SnackBar
          visible={visible}
          textMessage="Data refreshed"
          actionHandler={() => {
            console.log('Data refreshed');
          }}
        />
        <View
          style={{
            height: height / 15,
            backgroundColor: '#3dadcc',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
            }}>
            SAVED FILES
          </Text>
        </View>
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
                <View style={{marginTop: 10}}>
                  <View style={{elevation: 6}}>
                    <View style={{height: 5, backgroundColor: 'gold'}}></View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={{padding: 10}}
                        name="musical-notes"
                        size={30}
                        color="black"
                      />
                      <Text>{name}</Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#3dadcc',
                        paddingHorizontal: 40,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            sound.pause();
                          }}>
                          <Icon
                            style={{padding: 10}}
                            name="pause"
                            size={20}
                            color="white"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            sound = new Sound(
                              filepath + '/' + name,
                              null,
                              (error) => {
                                if (error) {
                                  // do something
                                  console.log(error);
                                }
                                // play when loaded
                                sound.play();
                              },
                            );
                          }}>
                          <Icon
                            style={{padding: 10}}
                            name="play"
                            size={20}
                            color="white"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            Share.open({
                                url: 'file://'+filepath + '/' + name,
                                type: 'audio/mp3',
                                failOnCancel: false
                            });
                        }}>
                          <Icon
                            style={{padding: 10}}
                            name="share-social"
                            size={20}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
