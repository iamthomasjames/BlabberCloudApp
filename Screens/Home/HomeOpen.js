import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Button} from 'react-native';
import Home from '../Home/Home';
import Files from '../ShowFiles/ShowFiles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

function NotificationsScreen({navigation}) {
  auth()
    .signOut()
    .then(() => navigation.navigate('Login'));
  return null;
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({route, navigation}) => {
  const {user, email, photo, uid} = route.params.params;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Files') {
            iconName = focused
              ? 'file-tray-stacked'
              : 'file-tray-stacked-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3dadcc',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{user, email, photo, uid}}
      />
      <Tab.Screen name="Files" component={Files} />
    </Tab.Navigator>
  );
};

export default function HomeOpen({route, navigation}) {
  const {user, email, photo, uid} = route.params;
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        initialParams={route}
      />
      <Drawer.Screen name="Logout" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
