import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { topPicks } from "../Data";

const Toppicks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Picks</Text>
      {topPicks.map((item, index) => (
        <ImageBackground
          key={index}
          source={{ uri: item.img }}
          style={styles.imageBackground}
          imageStyle={styles.image}
          blurRadius={2}
        >
          <View style={styles.infoContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        </ImageBackground>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#C2410D",
    marginBottom: 20,
  },
  imageBackground: {
    width: 350,
    height: 250,
    justifyContent: "flex-end",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
  },
  infoContainer: {
    backgroundColor: "rgba(194, 65, 13, 0.8)", // Semi-transparent background
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  titleContainer: {
    marginBottom: 5,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  priceContainer: {
    marginTop: 5,
  },
  price: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Toppicks;
