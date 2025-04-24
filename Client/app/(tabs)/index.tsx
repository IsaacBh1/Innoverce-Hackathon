import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationButton from "../../components/ui/NavigationButton.jsx";
import Feather from "react-native-vector-icons/Feather";
import RestaurantsScreen from "./Resturant.tsx";
import RestaurantDetailsScreen from "./RestaurantDetailsScreen.tsx";
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <>
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen
        name="Home"
        children={() => <NavigationButton name="Home" icon="home" />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Resturant"
        component={RestaurantsScreen} // Directly pass the Resturant component
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="fast-food-outline" color={color} size={size} />
          ),
        }}
      />

      
      
    </Tab.Navigator>
    </>
  );
}
