import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransportScreen from "./TransportScreen.jsx";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Hotels from "./Hotels/index.tsx";
import RestaurantsScreen from "./Resturant.tsx";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import Account from "./Acount.tsx";
import GuideListScreen from "./GuideListScreen.jsx"

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false ,    tabBarActiveTintColor: '#0a7ea4',   }}>
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
        name="Resturant"
        component={RestaurantsScreen} // Directly pass the Resturant component
        options={{
          title: "Resturant",
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="fast-food" color={color} size={size} />
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
        name="Guides"
        component={GuideListScreen}
        options={{
          title: "Guides",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="users" color={color} size={22} />
          ),
        }}
      />
          <Tab.Screen
        name="Acount"
        component={Account} // Directly pass the Resturant component
        options={{
          title: "Acount",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome  name="user-circle-o" color={color} size={size} />
          ),
        }}
      />
      
      
    </Tab.Navigator>
    
  );
}
