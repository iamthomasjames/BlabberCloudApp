import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login/Login'
import auth from '@react-native-firebase/auth';
import Home from './Screens/Home/Home'

export default function App({navigation}) {
  const Stack = createStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);
  
 
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="login">
       <Stack.Screen name="Login" component={Login} options={{ headerShown:false }} navigation={navigation}/>
       <Stack.Screen name="Home" component={Home} options={{ headerShown:false }} />
     </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
