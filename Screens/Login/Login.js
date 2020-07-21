import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import ButtonView from '../../Components/Button/Index'
import LottieView from 'lottie-react-native';

GoogleSignin.configure({
  webClientId:
    '1086234057257-ira00t6p1i55as8eg952jrr0228h1mmq.apps.googleusercontent.com',
});

export default function Login({navigation}) {
  const {width, height} = Dimensions.get('window');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);


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
    console.log(user)
    if(user)
    {
    navigation.navigate("Home",{
        user: user.displayName,
        email:user.email,
        photo:user.photoURL,
        uid:user.uid
      })
    }
    if (initializing) setInitializing(false);
  }
 

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount

  });

  if(!loading){
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="#ffff" />
      <View
        style={{
          height: height / 1.5,
          backgroundColor: 'white',
          borderBottomEndRadius: 50,
          alignItems: 'center',
         
          justifyContent:'center'
        }}>
             <View style={{flex:1, alignSelf: 'flex-start',marginHorizontal:30}}>
          <Text style={{fontSize:30,color:'gold',fontWeight:'700'}}>BLABBER</Text>
          <Text style={{letterSpacing:2,fontWeight:'700',textTransform:'uppercase'}}>The text to spech app</Text>
        </View>
        <View style={{flex: 4,...StyleSheet.absoluteFill}}>
          <Image 
            style={{
              width: 500,
              flex: 1,
              height: 100,
              resizeMode: 'contain',
            }}
            source={require('../../Assets/Images/login.png')}

          />
         
        </View>
       
      </View>
      <View
        style={{
          height: height - height / 1.5 + 50,
          backgroundColor: 'tomato',
          top: -50,
          zIndex: -1,
          justifyContent:'center'
         
        }}>
         <View style={{marginHorizontal:30}}>

            <ButtonView title="LOGIN WITH GOOGLE" color="white" onPress={()=>{
              setLoading(true)
              onGoogleButtonPress().then(()=>{
              setLoading(false)
            })}} image={require('../../Assets/Images/google.png')}/>
         </View>
        
        </View>
    </View>
  );
          }
          else{
            return(
              <View style={{flex:1,backgroundColor:"green",alignContent:'center',justifyContent:'center'}}>
                <View style={{flex:1,alignContent:'center',justifyContent:'center'}}>
                <LottieView source={require('../../Assets/json/loading.json')} autoPlay loop />
                <View style={{marginTop:140}}>
                <Text style={{alignSelf:'center',color:'white',fontSize:20,fontWeight:'700'}}>Signing.....</Text>
                </View>
                </View>
              </View>
              
            )
          }
}

const styles = StyleSheet.create({});
