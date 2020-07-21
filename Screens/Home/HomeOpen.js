import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import Home from '../Home/Home'
  
  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }

const Drawer = createDrawerNavigator();

export default function HomeOpen({route, navigation}) {
    const {user, email, photo, uid} = route.params;
    return (
      <Drawer.Navigator initialRouteName="Home" >
          <Drawer.Screen name="Home" component={Home} initialParams={{user, email, photo, uid}}/>
          <Drawer.Screen name="About Us" component={NotificationsScreen} />
      </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})
