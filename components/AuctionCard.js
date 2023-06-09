import { View, Text,Image,TouchableOpacity, ScrollView,StyleSheet,LogBox } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import Auction from '../screens/Auction'
import { useLinkProps, useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/firestore'


const AuctionCard =({item}) => {
  const navigation=useNavigation();
  const user=firebase.auth().currentUser;
  var cnt=0;
  
  
  

  const Addparticipant=()=>{
    
    firebase.firestore().collection('Auctions').doc(item.id).collection('participants').add({
      name:null,
      Item:item.Item,
      desc:item.desc,
      amount:0,
      
  }).then(()=>{
      navigation.navigate('Auction',{img:item.image,item:item});
    })

  }

  
  
  return (
   
   <View style={{marginBottom:40,display:'flex',alignItems:'center',justifyContent:'center'}}>
   <ScrollView scrollEnabled>
   <View style={[styles.card, styles.elevation]}>
        <View>
        <Image source={{uri:item.image}} style={{width:300,height:230}} resizeMode="stretch"/>
        </View>
        <View style={{paddingVertical:20}}>
        <View style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'black',fontSize:20,marginBottom:10,fontWeight:'bold'}}>{item.Item}</Text>
        <Text style={{color:'black',fontSize:20,marginBottom:10,fontWeight:'bold',color:'green'}}> ₹ {item.value}</Text>
        </View>
        <Text style={{color:'black',fontSize:16}}>
         {item.desc}
        </Text>
        
        </View>
        <TouchableOpacity onPress={Addparticipant}>
          <Text style={{backgroundColor:'#4830D3',textAlign:'center',padding:15,color:'white',fontSize:18,borderRadius:30}}>Participate</Text>
        </TouchableOpacity>
</View>
    </ScrollView>
   </View>
  )
}

export default AuctionCard;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
});