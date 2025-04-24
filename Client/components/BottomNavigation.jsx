import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const BottomNavigation = () => {
  const tabs = [
    { id: "delivery", icon: "shopping-bag", label: "Delivery", active: false },
    {
      id: "restaurants",
      icon: "utensils",
      label: "Restaurants",
      active: false,
    },
    { id: "stores", icon: "shopping-cart", label: "Stores", active: true },
    { id: "search", icon: "search", label: "Search", active: false },
    { id: "profile", icon: "user", label: "Profile", active: false },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, tab.active && styles.activeTab]}
        >
          <Feather
            name={tab.icon}
            size={22}
            color={tab.active ? "#3184FF" : "#999"}
          />
          <Text style={[styles.tabLabel, tab.active && styles.activeTabLabel]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingBottom: 20, // For safe area at bottom
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: "#3184FF",
    paddingTop: 5, 
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#999",
  },
  activeTabLabel: {
    color: "#3184FF",
  },
});

export default  BottomNavigation ;
