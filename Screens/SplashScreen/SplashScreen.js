import React, { useEffect,useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import auth from '@react-native-firebase/auth';


export default function SplashScreen({navigation}) {

    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);
    const [path, setPath] = useState("");

      function onAuthStateChanged(user) {
        setUser(user);
        if(user)
        {
            setTimeout(function(){
                navigation.navigate("Home",{
              user: user.displayName,
              email:user.email,
              photo:user.photoURL,
              uid:user.uid
            })
          }, 3000)
        }
        else{
            setTimeout(function(){
                navigation.navigate("Login");
          }, 3000)
        }
        if (initializing) setInitializing(false);
      }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    
      });

    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
            <Image source={require('../../Assets/Images/logo.png')}
            style={{width:200,height:200,resizeMode:'center',}}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
