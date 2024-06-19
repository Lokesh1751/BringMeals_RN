import React from "react";
import { StyleSheet, Image, View, Text, ScrollView } from "react-native"; // Import ScrollView for horizontal scrolling
import { categories } from "../Data"; // Assuming 'categories' is an array of objects containing 'image' URIs

const TopCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Categories</Text>
      <View style={styles.imageContainer}>
        {categories.map((item, index) => (
          <Image
            key={index}
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#C2410D",
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    width: 400,
    gap: 14,
    flexWrap: "wrap",
  },
  image: {
    width: 180, // Adjust width and height as per your requirement
    height: 100,
    marginHorizontal: 5, // Add spacing between images
    borderRadius: 10, // Optional: Add border radius
  },
});

export default TopCategories;
