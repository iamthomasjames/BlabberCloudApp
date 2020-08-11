import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Header from '../../Components/Header/Index';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Recharge({navigation}) {
  const {width, height} = Dimensions.get('window');
  return (
    <View style={{backgroundColor:"#3dadcc",flex:1}}>
      <Header text="REACHARGE BUCKET" navigation={navigation} />
      <View style={{height:5,padding:10,marginBottom:20,alignItems:'center'}}>
        <Text style={{fontSize:20,fontWeight:'700',color:'white'}}>PRICING</Text>
        <View style={{borderColor:'white',borderWidth:2,width:width/3}}>
                    
        </View>
      </View>
      <View style={{padding: 10, flex: 1}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                height: height / 3,
                width: width / 2 - 5,
                backgroundColor: 'white',
                borderRadius: 10,
               
              }}>
                  <View style={{alignItems:'center',backgroundColor:'gold',borderRadius:10}}>
                  <Text style={{fontSize:15}}>Save <Text style={{color:'green',fontWeight:'700'}}>50%</Text></Text>
                  </View>
                  <View style={{alignItems:'center',marginTop:30,}}>
                  <Text style={{fontSize:15,textDecorationLine:'line-through'}}>$2</Text>
                  <Text style={{color:'green',fontWeight:'700',fontSize:35}}>$1</Text>
                  </View>
                  <View style={{marginTop:5,backgroundColor:'gold',height:25,alignItems:'center'}}>
                  <Text style={{color:'black',fontWeight:'700',fontSize:15}}>20000 characters</Text>
                  </View>
                  <View style={{marginTop:5,alignItems:'center'}}>
                  <Text style={{color:'black',fontWeight:'700',fontSize:10}}>Save $1200 on Infrastructure costs</Text>
                  </View>
              
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: height / 3,
                width: width / 2 - 15,
                backgroundColor: 'white',
                marginLeft: 5,
                borderRadius: 10,
              }}>
               <View style={{alignItems:'center',backgroundColor:'gold',borderRadius:10}}>
                  <Text style={{fontSize:15}}>Save <Text style={{color:'green',fontWeight:'700'}}>60%</Text></Text>
                  </View>
                  <View style={{alignItems:'center',marginTop:30,}}>
                  <Text style={{fontSize:15,textDecorationLine:'line-through'}}>$5</Text>
                  <Text style={{color:'green',fontWeight:'700',fontSize:35}}>$2</Text>
                  </View>
                  <View style={{marginTop:5,backgroundColor:'gold',height:25,alignItems:'center'}}>
                  <Text style={{color:'black',fontWeight:'700',fontSize:15}}>60000 characters</Text>
                  </View>
                  <View style={{marginTop:5,alignItems:'center'}}>
                  <Text style={{color:'black',fontWeight:'700',fontSize:10}}>Save $1200 on Infrastructure costs</Text>
                  </View>
            </TouchableOpacity>
            
            
          </View>
          <View style={{alignItems:'center',marginTop:10}}>
          <TouchableOpacity
              style={{
                height: height / 3,
                width: width / 2 - 5,
                backgroundColor: 'white',
                borderRadius: 10,
               
              }}>
                  <View style={{alignItems:'center',backgroundColor:'gold',borderRadius:10}}>
                  <Text style={{fontSize:15}}>Save <Text style={{color:'green',fontWeight:'700'}}>50%</Text></Text>
                  </View>
                  <View style={{alignItems:'center',marginTop:30,}}>
                  <Text style={{fontSize:15,textDecorationLine:'line-through'}}>$10</Text>
                  <Text style={{color:'green',fontWeight:'700',fontSize:35}}>$5</Text>
                  </View>
                  <View style={{marginTop:5,backgroundColor:'gold',height:25,alignItems:'center'}}>
                  <Text style={{color:'black',fontWeight:'700',fontSize:15}}>100000 characters</Text>
                  </View>
                  <View style={{marginTop:5,alignItems:'center'}}>
                  <Text style={{color:'black',fontWeight:'700',fontSize:10}}>Save $1200 on Infrastructure costs</Text>
                  </View>
              
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
