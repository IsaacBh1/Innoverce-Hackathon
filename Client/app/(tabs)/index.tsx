import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationButton from "../../components/ui/NavigationButton.jsx";
import Feather from "react-native-vector-icons/Feather.js";
import Hommmee from "./Hotels/index.tsx";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Hola"
        component={Hommmee}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Black"
        children={() => <NavigationButton name="Home" icon="home" />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
