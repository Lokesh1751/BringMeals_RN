import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const QuickDel = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          color: "#C2410D",
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        QuickDelivery
      </Text>
      <Image
        source={{
          uri: "https://res.cloudinary.com/ehizeex-shop/image/upload/v1672676822/NetflixApp/FC_two_phones.6ec9a842f905769677f9_m91off.webp",
        }}
        width={420}
        height={400}
      />
      <View style={{ display: "flex", padding: 10 }}>
        <Text style={{ color: "#C2410D", fontWeight: "bold", fontSize: 23 }}>
          Get the App
        </Text>
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 26 }}>
          Limitless Convinience on-demand
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          BringMeals Restaurant Delivery makes it easy to satisfy your food
          cravings without the hassle of cooking or dining out. Whether you're
          planning a cozy night in, a quick lunch at the office, or a special
          meal with friends and family, BringMeals brings the restaurant
          experience directly to you. It's a convenient way to enjoy a wide
          variety of cuisines, all with the tap of a button. BringMeals isn't
          just about delivering food; it's about delivering an exceptional
          dining experience. From quick weekday lunches to special weekend
          treats, this app has become an indispensable tool for foodies and busy
          individuals alike. Whether you're at home, in the office, or on the
          go, BringMeals ensures that delicious meals are always just a few taps
          away. Say goodbye to cooking stress and hello to a world of culinary
          delights with BringMeals!
        </Text>
      </View>
    </View>
  );
};

export default QuickDel;

const styles = StyleSheet.create({});
