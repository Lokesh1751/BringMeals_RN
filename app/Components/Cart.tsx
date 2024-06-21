import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  DocumentReference,
  doc,
  DocumentData,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/firebase.config";

// Define an interface for cart items
interface CartItem {
  description: string;
  imageUrl: string;
  name: string;
  price: string;
}

const Cart = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (!currentUser) {
        Alert.alert("Please log in first!");
        setLoading(false);
        return;
      }

      const cartItemsCollection = collection(FIRESTORE_DB, "carts");
      const q = query(
        cartItemsCollection,
        where("userEmail", "==", currentUser.email)
      );
      const querySnapshot = await getDocs(q);

      let fetchedCartItems: CartItem[] = [];
      querySnapshot.forEach((doc) => {
        fetchedCartItems = doc.data().items;
      });

      setCartItems(fetchedCartItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      Alert.alert(
        "Error",
        "Failed to fetch cart items. Please try again later."
      );
      setLoading(false);
    }
  };

  const deleteFromCart = async (itemName: string, itemDescription: string) => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      const cartRef: DocumentReference<DocumentData> = doc(
        FIRESTORE_DB,
        "carts",
        (currentUser && currentUser.email) || ""
      );

      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        const existingItems: CartItem[] = cartSnapshot.data()?.items || [];
        const updatedCartItems = existingItems.filter(
          (item) =>
            item.name !== itemName || item.description !== itemDescription
        );

        await setDoc(cartRef, {
          userEmail: currentUser && currentUser.email,
          items: updatedCartItems,
        });

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

  const clearCart = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      const cartRef: DocumentReference<DocumentData> = doc(
        FIRESTORE_DB,
        "carts",
        (currentUser && currentUser.email) || ""
      );

      await setDoc(cartRef, {
        userEmail: currentUser && currentUser.email,
        items: [],
      });

      setCartItems([]);

      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }, 3000);
    } catch (error) {
      console.error("Error clearing cart:", error);
      Alert.alert(
        "Error",
        "Failed to clear cart. Please try again later."
      );
    }
  };

  const placeOrder = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      const cartRef: DocumentReference<DocumentData> = doc(
        FIRESTORE_DB,
        "carts",
        (currentUser && currentUser.email) || ""
      );

      await setDoc(cartRef, {
        userEmail: currentUser && currentUser.email,
        items: [],
      });

      setCartItems([]);

      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }, 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert(
        "Error",
        "Failed to place order. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={30} color="#C2410D" />
      </TouchableOpacity>
      <Text style={styles.heading}>Cart</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : cartItems.length > 0 ? (
        <ScrollView>
          {cartItems.map((item: CartItem, index: number) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>Price: ${item.price}</Text>
              <TouchableOpacity
                onPress={() => deleteFromCart(item.name, item.description)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-bin" size={24} color="#FF6347" />
              </TouchableOpacity>
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={styles.button} onPress={() => clearCart()}>
              Clear Cart
            </Text>
            <Text style={styles.button} onPress={() => placeOrder()}>
              Place Order
            </Text>
          </View>
        </ScrollView>
      ) : (
       !showLoader && !showSuccessMessage && <Text style={styles.emptyCart}>Cart is Empty!</Text>
      )}
      {showLoader && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Loading...</Text>
        </View>
      )}
      {showSuccessMessage && (
        <View style={[styles.overlay]}>
          <Text style={styles.overlayText}>Order placed successfully!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
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
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
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
  button: {
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "#C2410D",
    width: 130,
    color: "white",
    padding: 10,
    textAlign: "center",
    marginBottom: 40,
    alignSelf: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontSize: 20,
    color: "#fff",
  },
  emptyCart: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
  },
});

export default Cart;
