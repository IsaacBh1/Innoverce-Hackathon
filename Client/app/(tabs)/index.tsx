import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationButton from "../../components/ui/NavigationButton.jsx";
import Feather from "react-native-vector-icons/Feather";
import TransportScreen from "./TransportScreen.jsx";
import GuideListScreen from "./GuideListScreen.jsx";
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
        name="Black"
        children={() => <GuideListScreen />}
        options={{
          title: "Guides",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
