import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TransportCard = ({ title, icon }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Icon name={icon} size={26} color=" #0a7ea4" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor:"#FAF9F6"
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: (title) => (title === "Bike Rental" ? "#FFA500" : "#000"),

  },
});

export default TransportCard;
