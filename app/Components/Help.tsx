import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Importing MaterialCommunityIcons from Expo

const Menu = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.backButton}
      >
        <MaterialCommunityIcons name="arrow-left" size={30} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.backgroundImage}>
        <Text style={styles.title}>Get In Touch</Text>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons
              name="phone"
              size={50}
              color="#ffffff"
              style={styles.icon}
            />
            <Text style={styles.infoTitle}>Phone</Text>
            <View>
              <Text style={styles.infoText}>Whatsapp Numbers:</Text>
              <Text style={styles.infoText}>7788662314</Text>
              <Text style={styles.infoText}>9876289034</Text>
              <Text style={styles.infoText}>7566234567</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons
              name="email"
              size={50}
              color="#ffffff"
              style={styles.icon}
            />
            <Text style={styles.infoTitle}>Email</Text>
            <View>
              <Text style={styles.infoText}>bgm@gmail.com</Text>
              <Text style={styles.infoText}>foodget@gmail.com</Text>
              <Text style={styles.infoText}>ritikgr@gmail.com</Text>
              <Text style={styles.infoText}>lokeshangi@gmail.com</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.messageTitle}>Message Us</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Your Message:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={5}
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  backButton: {
    top: 30,
    left: 20,
    zIndex: 1, // Ensure the arrow icon is above other content
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 20,
  },
  infoContainer: {
    alignItems: "center",
    margin: 10,
  },
  icon: {
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  infoTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  messageTitle: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
  },
  label: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: "#ffffff",
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#C2410D",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Menu;
