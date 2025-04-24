import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationButton from "../../components/ui/NavigationButton.jsx";
import Feather from "react-native-vector-icons/Feather.js";
<<<<<<< HEAD
import Hommmee from "./Hotels/index.tsx";

=======
import TransportScreen from "./TransportScreen.jsx";
>>>>>>> f039f04f8a24c9be2b36c6b67ae59a3edf50a48a
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
<<<<<<< HEAD
        name="Hola"
        component={Hommmee}
=======
        name="Home"
        children={() => <TransportScreen/>}
>>>>>>> f039f04f8a24c9be2b36c6b67ae59a3edf50a48a
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Black"
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
