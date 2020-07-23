import React, {useEffect} from 'react';
import {StyleSheet, Text, View,BackHandler} from 'react-native';

export default function ShowFiles({route, navigation}) {
  const {jsonvalues} = route.params;
  const values = JSON.parse(jsonvalues);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={{flex: 1}}>
      {Object.entries(values).map(([, {name, path}]) => {
        return <Text>{path}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
