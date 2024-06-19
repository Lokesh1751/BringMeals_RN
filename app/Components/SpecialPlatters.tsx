import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { specialOffersArray } from "../Data";

const SpecialPlatters = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#C2410D",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Special Platters
      </Text>
      {specialOffersArray.map((item) => {
        return (
          <View
            key={item.description}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              margin: 8,
            }}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.img} />
            <View style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Text
                style={{ color: "#C2410D", fontSize: 20, fontWeight: "bold" }}
              >
                {item.offerName}
              </Text>
              <Text style={{ color: "black", fontSize: 15 }}>
                Price: ${item.price}
              </Text>
              <Text style={{ fontSize: 15 }}>{item.comboItems}</Text>
              <Text>{item.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default SpecialPlatters;

const styles = StyleSheet.create({
  img: {
    width: 180,
    height: 200,
    borderRadius: 30,
  },
});
