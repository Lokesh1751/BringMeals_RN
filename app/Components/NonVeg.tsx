import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import React from 'react'
import { nonVegetarianFoodItems } from '../Data';
const NonVeg = ({navigation}:any) => {
    return (
        <ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Text
              style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
              onPress={()=>navigation.navigate("Menu")}
            >
               
              Veg Menu
            </Text>
            <Text   style={{
                color: "#C2410D",
                fontSize: 30,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }} >
              Non Veg Menu
            </Text>
          </View>
          <View style={{display:'flex',flexDirection:'column',gap:20,margin:20}}>
            {nonVegetarianFoodItems.map((item) => {
              return (
                <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                  <Image source={{ uri: item.imageUrl }} width={200} height={200} style={{borderRadius:30}} />
                  <View style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                    <Text style={{color:'#C2410D',fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                    <Text style={{width:170,fontSize:15}}>{item.description}</Text>
                    <Text style={{color:"#C2410D",fontWeight:'bold',fontSize:16}}>Price: ${item.price}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      );
}

export default NonVeg

const styles = StyleSheet.create({})