import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationButton from "../../components/ui/NavigationButton.jsx";
import Feather from "react-native-vector-icons/Feather.js";
import TransportScreen from "./TransportScreen.jsx";
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
<<<<<<< HEAD
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
        children={() => <NavigationButton name="Home" icon="home" />}
        options={{
          title: "koukou",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
=======
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ButtomNavigations} />
      <Tab.Screen name="Settings" component={npm install react-native-vector-icons} />
      <Tab.Screen name="Bla" component={ButtomNavigation} />
      <Tab.Screen name="Koukou" component={ButtomNavigation} />
>>>>>>> 87f09ec (local v3)
    </Tab.Navigator>
  );
}
