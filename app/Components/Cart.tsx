import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";

const Cart = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (!currentUser) {
        Alert.alert("Please log in first!");
        return;
      }

      const cartItemsCollection = collection(FIRESTORE_DB, "carts");
      const q = query(cartItemsCollection, where("userEmail", "==", currentUser.email));
      const querySnapshot = await getDocs(q);

      let fetchedCartItems: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedCartItems = doc.data().items;
      });

      setCartItems(fetchedCartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      Alert.alert(
        "Error",
        "Failed to fetch cart items. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#C2410D" />
      </TouchableOpacity>
      <Text style={styles.heading}>Cart</Text>
      {cartItems.length > 0 ? (
        <View style={styles.cartItemsContainer}>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>Price: ${item.price}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyCart}>Loading....</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:40
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cartItemsContainer: {
    marginTop: 10,
  },
  cartItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#ccc",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C2410D",
  },
  emptyCart: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 26,
  },
});

export default Cart;
