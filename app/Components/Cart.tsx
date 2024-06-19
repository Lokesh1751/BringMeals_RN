import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  DocumentReference,
  doc,
  DocumentData
} from "firebase/firestore";

// Define an interface for cart items
interface CartItem {
description: string;
imageUrl:string
  name: string;
  price: string;
}

const Cart = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Use CartItem[] here

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

      let fetchedCartItems: CartItem[] = [];
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

  const deletefromKart = async (itemName: string, itemDescription: string) => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      const cartRef: DocumentReference<DocumentData> = doc(
        FIRESTORE_DB,
        "carts",
        currentUser && currentUser.email || ""
      );
  
      // Check if the cart document exists
      const cartSnapshot = await getDoc(cartRef);
  
      if (cartSnapshot.exists()) {
        const existingItems: CartItem[] = cartSnapshot.data()?.items || [];
        // Filter out the item with the specified name and description
        const updatedCartItems = existingItems.filter(item =>
          item.name !== itemName || item.description !== itemDescription
        );
  
        // Update or create the cart document with the updated items
        await setDoc(cartRef, {
          userEmail: currentUser && currentUser.email,
          items: updatedCartItems,
        });
  
        // Update local state to reflect the change
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      Alert.alert(
        "Error",
        "Failed to delete item from cart. Please try again later."
      );
    }
  };
  
  const clearcart = async () => {
   
      const currentUser = FIREBASE_AUTH.currentUser;
      const cartRef: DocumentReference<DocumentData> = doc(
        FIRESTORE_DB,
        "carts",
        currentUser && currentUser.email || ""
      );
      // Check if the cart document exists
      const cartSnapshot = await getDoc(cartRef);
        // Update or create the cart document with the updated items
        await setDoc(cartRef, {
          userEmail: currentUser && currentUser.email,
          items: [],
        });
  
        // Update local state to reflect the change
        setCartItems([]);
      
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#C2410D" />
      </TouchableOpacity>
      <Text style={styles.heading}>Cart</Text>
      {cartItems.length > 0 ? (
        <View style={styles.cartItemsContainer}>
          {cartItems.map((item: CartItem, index: number) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>Price: ${item.price}</Text>
              <TouchableOpacity onPress={() => deletefromKart(item.name,item.description)} style={styles.deleteButton}>
                <Ionicons name="trash-bin" size={24} color="#FF6347" />
              </TouchableOpacity>
            </View>
          ))}
      <Text style={{fontSize:17,fontWeight:'bold',backgroundColor:"#C2410D",width:130,color:'white',padding:10,textAlign:'center'}} onPress={()=>clearcart()}>Clear Cart</Text>
        </View>
      ) : (
        <Text style={styles.emptyCart}>Cart is Empty ! </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  backButton: {
    position: "absolute",
    top: 0,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    flex: 2,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemDescription: {
    flex: 3,
    fontSize: 14,
    color: "#666",
  },
  itemPrice: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#C2410D",
    textAlign: "right",
  },
  deleteButton: {
    padding: 5,
  },
  emptyCart: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
  },
});

export default Cart;
