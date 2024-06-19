import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>
        <Text style={{ color: "white" }}>Bring</Text>Meals
      </Text>
      <Text style={styles.copyRightText}>
        Copyright © 2019 BringMeals. Delivering Moments!
      </Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon}>
          <Feather name="facebook" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Feather name="instagram" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Feather name="twitter" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Feather name="linkedin" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24262b",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C2410D",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  copyRightText: {
    fontSize: 12,
    color: "#ccc",
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Footer;
