import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Slider = () => {
  const [index, setIndex] = useState(0); // State to track current slide index

  const sliders = [
    {
      url: "https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672076/NetflixApp/burger_emxbtv.jpg",
    },
    {
      url: "https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672452/NetflixApp/pizza_osjb4f.jpg",
    },
    {
      url: "https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672612/NetflixApp/ric_a4ewxo.jpg",
    },
  ];

  const next = () => {
    if (index === sliders.length - 1) {
      setIndex(0); // Wrap around to the first slide
    } else {
      setIndex(index + 1); // Move to the next slide
    }
  };

  const prev = () => {
    if (index === 0) {
      setIndex(sliders.length - 1); // Wrap around to the last slide
    } else {
      setIndex(index - 1); // Move to the previous slide
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: sliders[index].url }}
        style={styles.imageBackground}
      >
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={prev}
            style={{
              backgroundColor: "#C2410D",
              borderRadius: 100,
              padding: 10,
            }}
          >
            <Icon name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={next}
            style={{
              backgroundColor: "#C2410D",
              borderRadius: 100,
              padding: 10,
            }}
          >
            <Icon name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 400,
    // Adjust this height as per your requirement
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    marginTop: 20, // Adjust margin top as per your layout needs
  },
});

export default Slider;
