import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase.config";
import { MaterialIcons as Icon } from "@expo/vector-icons"; // Importing MaterialIcons from Expo

const SignUp = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSignUp = async () => {
    if (password === repeatPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        const user = userCredential.user;
        console.log("User created:", user.uid);
        Alert.alert("User Created Successfully");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        navigation.navigate("Login");
        // Optionally handle navigation or other logic after successful signup
      } catch (error) {
        console.error("Error signing up:", error);
        Alert.alert("Error", "Failed to create user.");
      }
    } else {
      Alert.alert("Error", "Password does not match.");
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/SVt8JKy/bg.jpg" }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Repeat Password"
          onChangeText={setRepeatPassword}
          value={repeatPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Sign Up" onPress={handleSignUp} color="#C2410D" />
          <Button
            title="Login"
            onPress={() => navigation.navigate("Login")}
            color="#C2410D"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with 50% opacity
    width: "100%",
    padding: 20,
    position: "relative", // Ensure relative positioning for absolute elements
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1, // Ensure it's above other content
  },
  title: {
    color: "#C2410D",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: 300,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "white", // Adjust background color of inputs as needed
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default SignUp;
