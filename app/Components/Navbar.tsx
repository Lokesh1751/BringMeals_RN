import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { FIREBASE_AUTH } from "@/firebase.config";

const Navbar = ({ nav }: any) => {
  const [vis, setvis] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut(); // Sign out from Firebase
      setUser(null); // Clear currentUser state
      Alert.alert("Logged out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error signing out. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
  return (
    <View style={{zIndex:50}}>
      <View style={styles.header}>
        <Icon
          name="menu"
          size={48}
          color="black"
          onPress={() => setvis(!vis)}
        />
        <Text style={styles.logoText}>
          Bring
          <Text style={styles.boldText}>Meals</Text>
        </Text>
        {user ? (
          <Text
            style={{
              backgroundColor: "#C2410D",
              padding: 10,
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
            onPress={handleSignOut}
          >
            Logout
          </Text>
        ) : (
          <Text
            style={{
              backgroundColor: "#C2410D",
              padding: 10,
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
            onPress={() => nav.navigate("Login")}
          >
            Login
          </Text>
        )}
      </View>
      <View style={vis ? styles.dropdown : styles.dropdownclose}>
        <View style={styles.dropdownHeader}>
          <Text style={styles.logoText}>
            Bring
            <Text style={styles.boldText}>Meals</Text>
          </Text>
          <Icon
            name="close"
            size={30}
            color="black"
            onPress={() => setvis(!vis)}
          />
        </View>
        <Text style={styles.menuItem} onPress={()=>nav.navigate("Signup")}>
          <Icon name="account-circle" size={30} color="black" />
          SignUp
        </Text>
        <Text style={styles.menuItem} onPress={()=>nav.navigate("Menu")}>
          <Icon name="menu" size={30} color="black" />
          Menu
        </Text>
        <Text style={styles.menuItem}>
          <Icon name="comment" size={30} color="black" />
          FeedBack
        </Text>
        <Text style={styles.menuItem}>
          <Icon name="view-grid" size={30} color="black" />
          Categories
        </Text>
        <Text style={styles.menuItem}>
          <Icon name="help-circle" size={32} color="black" />
          Help
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    position: "relative",
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 50,
  },
  logoText: {
    fontSize: 34,
  },
  boldText: {
    color: "#C2410D",
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "#E6E7EB",
    padding: 15,
    width: 150,
    borderRadius: 20,
  },
  dropdown: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    width: "80%",
    height: 940,
    padding: 20,
    display: "flex",
    gap: 30,
   zIndex: 50,
  },
  dropdownclose: {
    position: "absolute",
    left: -700,
    backgroundColor: "white",
    width: "80%",
    height: 960,
    padding: 20,
    display: "flex",
    gap: 30,
    zIndex: 50,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  //  zIndex: 100,
  },
  menuItem: {
    fontSize: 23,
    fontWeight: "bold",
  },
});
export default Navbar;
