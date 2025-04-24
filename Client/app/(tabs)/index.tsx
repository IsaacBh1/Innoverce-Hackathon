import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantsScreen from "./Resturant.tsx";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import TransportScreen from "./TransportScreen.jsx";
import Account from "./Acount.tsx";
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
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Resturant"
        component={RestaurantsScreen} // Directly pass the Resturant component
        options={{
          title: "fast food",
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="fast-food-outline" color={color} size={size} />
          ),
        }}
      />
          <Tab.Screen
        name="Acount"
        component={Account} // Directly pass the Resturant component
        options={{
          title: "Acount",
          tabBarIcon: ({ color, size }) => (
            <EvilIcons  name="user" color={color} size={size} />
          ),
        }}
      />
      
      
    </Tab.Navigator>
    
  );
}
