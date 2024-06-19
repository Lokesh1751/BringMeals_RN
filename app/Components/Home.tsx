import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import QuickDel from "../Components/QuickDel";
import Toppicks from "../Components/Toppicks";
import OurMeal from "../Components/OurMeal";
import SpecialPlatters from "../Components/SpecialPlatters";
import TopCategories from "../Components/TopCategories";
import Footer from "../Components/Footer";

const Home = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4500);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/ee/1d/08/ee1d081c5bdf966b058c1a6588e73e8a.gif",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>
          Bring<Text style={styles.highlighted}>Meals</Text>
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Navbar nav={navigation} />
      <Slider />
      <QuickDel />
      <Toppicks />
      <OurMeal />
      <SpecialPlatters />
      <TopCategories />
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffafc",
  },
  container: {
    flex: 1,
    backgroundColor: "#fffafc",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  highlighted: {
    color: "#C2410D",
  },
});

export default Home;
