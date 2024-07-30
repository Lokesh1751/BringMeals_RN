import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Modal,
  TextInput,
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
  addDoc,
  doc,
  DocumentData,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/firebase.config";
import ConfettiCannon from "react-native-confetti-cannon";

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
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (!currentUser || !currentUser.email) {
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
      const email = currentUser?.email;

      if (!email) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }

      const cartRef = doc(FIRESTORE_DB, "carts", email);

      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        const existingItems: CartItem[] = cartSnapshot.data()?.items || [];
        const updatedCartItems = existingItems.filter(
          (item) =>
            item.name !== itemName || item.description !== itemDescription
        );

        await setDoc(cartRef, {
          userEmail: email,
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
      const email = currentUser?.email;

      if (!email) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }

      const cartRef = doc(FIRESTORE_DB, "carts", email);

      await setDoc(cartRef, {
        userEmail: email,
        items: [],
      });

      setCartItems([]);

      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
      }, 3000);
    } catch (error) {
      console.error("Error clearing cart:", error);
      Alert.alert("Error", "Failed to clear cart. Please try again later.");
    }
  };

  const placeOrder = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      const email = currentUser?.email;

      if (!email) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }

      const gst = (totalPrice * 0.1).toFixed(2);
      const finalTotal = (totalPrice + parseFloat(gst)).toFixed(2);

      const orderData = {
        userEmail: email,
        items: cartItems,
        address: address,
        totalPrice: totalPrice,
        gst: gst,
        finalTotal: finalTotal,
        timestamp: new Date(),
      };

      await addDoc(collection(FIRESTORE_DB, "orders"), orderData);

      const cartRef = doc(FIRESTORE_DB, "carts", email);

      await setDoc(cartRef, {
        userEmail: email,
        items: [],
      });

      setCartItems([]);
      setAddress("");
      setShowModal(false);

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
      Alert.alert("Error", "Failed to place order. Please try again later.");
    }
  };

  useEffect(() => {
    const output = cartItems.reduce((tprice: number, curr) => {
      tprice = tprice + Number(curr.price);
      return tprice;
    }, 0);
    setTotalPrice(output);
  }, [cartItems]);

  const gst = (totalPrice * 0.1).toFixed(2); // Assuming 10% GST

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteFromCart(item.name, item.description)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-bin" size={24} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

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
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#C2410D" />
        </View>
      ) : cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.name + item.description}
            contentContainerStyle={{ flexGrow: 1 }}
            ListFooterComponent={
              <View style={styles.footer}>
                <Text style={styles.tprice}>
                  Total Price: ${totalPrice.toFixed(2)}
                </Text>
                <View style={styles.buttonsAlignment}>
                  <TouchableOpacity
                    onPress={clearCart}
                    style={styles.clearCartButton}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Clear Cart
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowModal(true)}
                    style={styles.button}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Continue to Payment
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        </>
      ) : (
        !showLoader &&
        !showSuccessMessage && (
          <Text style={styles.emptyCart}>Cart is Empty!</Text>
        )
      )}
      {showLoader && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#C2410D" />
        </View>
      )}
      {showSuccessMessage && (
        <View style={styles.overlay}>
          <Text
            style={[
              styles.overlayText,
              { color: "green", fontSize: 28, fontWeight: "bold" },
            ]}
          >
            Order placed successfully!
          </Text>
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        </View>
      )}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Confirm Order</Text>
            <Text style={styles.modalText}>
              Total Price: ${totalPrice.toFixed(2)}
            </Text>
            <Text style={styles.modalText}>GST (10%): ${gst}</Text>
            <Text style={styles.modalText}>
              Final Total: ${(totalPrice + parseFloat(gst)).toFixed(2)}
            </Text>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity
              onPress={placeOrder}
              style={styles.placeOrderButton}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Place Order
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: 180,
    color: "white",
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  clearCartButton: {
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "#C2410D",
    width: 130,
    color: "white",
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontSize: 20,
    color: "#C2410D",
  },
  emptyCart: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  tprice: {
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "green",
    width: 130,
    color: "white",
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
  },
  placeOrderButton: {
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "#28a745",
    width: 180,
    color: "white",
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "#C2410D",
    width: 180,
    color: "white",
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsAlignment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Cart;
