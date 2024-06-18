import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text,ImageBackground,StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase.config";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      // If signInWithEmailAndPassword succeeds, userCredential.user will contain user information
      if (userCredential.user) {
        Alert.alert("Login Successfully!");
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      }
    } catch (error:any) {
      console.error("Error signing in:", error.message);
      Alert.alert("Error", "Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/SVt8JKy/bg.jpg" }}
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Text
        style={{
          color: "#C2410D",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Login
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          width: 300,
          borderRadius: 20,
          marginBottom: 10,
          backgroundColor:"white"
        }}
        placeholder="Enter Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          width: 300,
          borderRadius: 20,
          marginBottom: 10,
          backgroundColor:"white"
        }}
        placeholder="Enter Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <View style={{ flexDirection: "row", justifyContent: "space-around", width: 300 }}>
        <Button title="Login" onPress={handleLogin} color="#C2410D" />
        <Button title="SignUp" onPress={() => navigation.navigate("Signup")} color="#C2410D" />
      </View>
    </View>
    </ImageBackground>
  );
};

export default Login;
const styles=StyleSheet.create({
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
  },
})
