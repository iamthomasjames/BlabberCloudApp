import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, ImageBackground,StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '1086234057257-ira00t6p1i55as8eg952jrr0228h1mmq.apps.googleusercontent.com',
});

export default function Login() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
         <StatusBar backgroundColor="#ffff"  />
    </View>
  );
}

const styles = StyleSheet.create({});
