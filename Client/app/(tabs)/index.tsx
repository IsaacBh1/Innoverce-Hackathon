import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import GuideListScreen from "./GuideListScreen.jsx";
import TransportScreen from "./TransportScreen.jsx";
import { FontAwesome5 } from "@expo/vector-icons";
import Hotels from "./Hotels/index.tsx";
import Landmarks from "./Landmarks/index.tsx"; // Import the correct component

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Hotels"
        component={Hotels}
        options={{
          title: "Hotels",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hotel" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Transport"
        children={() => <TransportScreen />}
        options={{
          title: "Transport",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="bus-alt" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Landmarks"
        component={Landmarks} // Use the landmarks list component
        options={{
          title: "Landmarks",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="landmark" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
