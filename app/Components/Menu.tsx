import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  FlatList,
} from "react-native";
import { nonVegetarianFoodItems, vegetarianFoodItems } from "../Data";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB, FIREBASE_AUTH } from "@/firebase.config";
import {
  setDoc,
  getDoc,
  doc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";

const Menu = ({ navigation }: any) => {
  const [menu, setMenu] = useState("veg");
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = async (item: any) => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (!currentUser) {
        Alert.alert("Please log in first!");
        return;
      }

      const cartRef: DocumentReference<DocumentData> = doc(
        FIRESTORE_DB,
        "carts",
        currentUser.email || ""
      );

      Alert.alert("Success", "Item added to cart successfully!");

      const cartSnapshot = await getDoc(cartRef);

      let updatedCartItems = [];
      if (cartSnapshot.exists()) {
        const existingItems = cartSnapshot.data()?.items || [];
        updatedCartItems = [...existingItems, item];
      } else {
        updatedCartItems = [item];
      }

      await setDoc(cartRef, {
        userEmail: currentUser.email,
        items: updatedCartItems,
      });

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      Alert.alert(
        "Error",
        "Failed to add item to cart. Please try again later."
      );
    }
  };

  return (
    <View>
      <ImageBackground
        source={{ uri: "https://i.ibb.co/SVt8JKy/bg.jpg" }}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={40} color="#C2410D" />
          </TouchableOpacity>
          <Text
            style={menu === "veg" ? styles.clicked : styles.normal}
            onPress={() => setMenu("veg")}
          >
            Veg Menu
          </Text>
          <Text
            style={menu === "nonveg" ? styles.clicked : styles.normal}
            onPress={() => setMenu("nonveg")}
          >
            Non Veg Menu
          </Text>
        </View>

        <View style={styles.menuContainer}>
          <FlatList
            renderItem={({ item }) => (
              <MenuItem item={item} addToCart={addToCart} />
            )}
            data={menu === "veg" ? vegetarianFoodItems : nonVegetarianFoodItems}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const MenuItem = ({ item, addToCart }: any) => (
  <View style={styles.menuItem}>
    <Image source={{ uri: item.imageUrl }} style={styles.menuItemImage} />
    <View style={styles.menuItemDetails}>
      <Text style={styles.menuItemName}>{item.name}</Text>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <Text style={styles.menuItemPrice}>Price: ${item.price}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Menu;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 60,
  },
  clicked: {
    color: "#C2410D",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  normal: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuContainer: {
    margin: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuItemImage: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  menuItemDetails: {
    marginLeft: 20,
    flex: 1,
  },
  menuItemName: {
    color: "#C2410D",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuItemDescription: {
    width: 170,
    fontSize: 15,
  },
  menuItemPrice: {
    color: "#C2410D",
    fontWeight: "bold",
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: "#C2410D",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
