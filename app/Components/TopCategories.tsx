import React from "react";
import { StyleSheet, Image, View, Text, FlatList } from "react-native";
import { categories } from "../Data";
const TopCategories = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          renderItem={({ item }: any) => {
            return (
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
            );
          }}
          data={categories}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={
            <Text style={styles.heading}>Top Categories</Text>
          }
        />
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
  row: {
    justifyContent: "space-between",
  },
});

export default TopCategories;
