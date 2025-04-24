import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationButton from "../../components/ui/NavigationButton.jsx";
import Feather from "react-native-vector-icons/Feather.js";
import TransportScreen from "./TransportScreen.jsx";
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        children={() => <TransportScreen/>}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Resturant"
        children={() => <NavigationButton name="Home" icon="home" />}
        options={{
          title: "koukou",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
