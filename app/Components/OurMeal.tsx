import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { mealData, pizza, salad, chicken } from "../Data";

const OurMeal = () => {
  const [data, setData] = useState<any[]>(mealData);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category: string, data: any[]) => {
    setSelectedCategory(category);
    setData(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Meal</Text>
      <View style={styles.categoryContainer}>
        <Text
          style={[
            styles.categoryButton,
            selectedCategory === "All" && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryChange("All", mealData)}
        >
          All
        </Text>
        <Text
          style={[
            styles.categoryButton,
            selectedCategory === "Pizza" && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryChange("Pizza", pizza)}
        >
          Pizza
        </Text>
        <Text
          style={[
            styles.categoryButton,
            selectedCategory === "Chicken" && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryChange("Chicken", chicken)}
        >
          Chicken
        </Text>
        <Text
          style={[
            styles.categoryButton,
            selectedCategory === "Salad" && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryChange("Salad", salad)}
        >
          Salad
        </Text>
      </View>
      <View style={styles.itemsContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#C2410D",
    textAlign: "center",
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#C2410D",
    color: "#C2410D",
    fontWeight: "bold",
    fontSize: 14,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: "#C2410D",
    color: "white",
    borderColor: "#C2410D",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "48%",
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  price: {
    fontSize: 14,
    color: "#666666",
  },
});

export default OurMeal;
