import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, FlatList, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "@/firebase.config";
import { FIRESTORE_DB } from "@/firebase.config";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from Expo

const Feedbacks = ({ navigation }: any) => {
  const [rating, setRating] = useState("");
  const [feed, setFeed] = useState("");
  const [user, setUser] = useState<any | null>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "feedbacks"));
        const fetchedFeedbacks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeedbacks(fetchedFeedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks: ", error);
        Alert.alert("Error", "Failed to fetch feedbacks. Please try again later.");
      }
    };

    fetchFeedbacks();

    // Cleanup function
    return () => {
      // Unsubscribe if needed
    };
  }, []);

  const addData = async () => {
    try {
      if (rating !== "" && feed !== "") {
        await addDoc(collection(FIRESTORE_DB, "feedbacks"), {
          mail: user.email,
          rating: rating,
          feedback: feed,
        });
        setRating("");
        setFeed("");
        Alert.alert("Success", "Feedback submitted successfully!");
      } else {
        Alert.alert("Error", "Please add feedback and rating first!");
      }
    } catch (error) {
      console.error("Error adding feedback: ", error);
      Alert.alert("Error", "Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={30} color="#C2410D" />
      </TouchableOpacity>
      <Text style={styles.heading}>Add Your Feedback</Text>
      <TextInput
        style={styles.input}
        value={rating}
        placeholder="Rating"
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={feed}
        placeholder="Your feedback"
        onChangeText={setFeed}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.submitButton} onPress={() => user ? addData() : Alert.alert("Login First!")}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      <Text style={{margin:30,fontSize:25,fontWeight:'bold',color:"#C2410D"}}> FeedBack's 👉🏻</Text>
      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.feedbackItem}>
            <Text style={styles.feedbackText}>UserEmail: {item.mail}</Text>
            <Text style={styles.feedbackText}>Feedback: {item.feedback}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(parseInt(item.rating))].map((_, index) => (
                <MaterialIcons key={index} name="star" size={24} color="#FFD700" />
              ))}
              {[...Array(5 - parseInt(item.rating))].map((_, index) => (
                <MaterialIcons key={index} name="star-outline" size={24} color="#FFD700" />
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
   
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    marginTop:50
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#C2410D",
    marginTop:50
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#C2410D",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  feedbackItem: {
    backgroundColor: "#C2410D",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
  },
  feedbackText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
  },
});

export default Feedbacks;
