import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import Index from "./Home"; // Adjust import path based on your project structure
import Details from "./Details"; // Adjust import path based on your project structure
import { useColorScheme } from "@/hooks/useColorScheme"; // Adjust import path based on your project structure
import { FontAwesome5 } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const hideSplash = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#FFFFFF", // Change background color of the tab bar
          },
          tabBarActiveTintColor: "#C2410D", // Change active tab text color
          tabBarInactiveTintColor: "#999999",
          headerShown:false
          // Change inactive tab text color
        }}
      
      >
        <Tab.Screen
          name="Home"
          component={Index}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />
            ),
            tabBarLabel: "Home", // Custom tab label (optional)
          }}
        />
        <Tab.Screen
          name="Details"
          component={Details}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="info-circle" size={size} color={color} />
            ),
            tabBarLabel: "Details", // Custom tab label (optional)
          }}
        />
      </Tab.Navigator>
  );
}
