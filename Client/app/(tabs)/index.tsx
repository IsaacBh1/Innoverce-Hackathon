import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import GuideListScreen from "./GuideListScreen.jsx";
import TransportScreen from "./TransportScreen.jsx";
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        children={() => <TransportScreen />}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Black"
        children={({ navigation }) => (
          <GuideListScreen navigation={navigation} />
        )}
        options={{
          title: "Guides",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Black"
        children={({ navigation }) => (
          <GuideListScreen navigation={navigation} />
        )}
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
