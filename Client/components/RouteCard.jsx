import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const RouteCard = ({ title, frequency, price }) => {
  return (
    <View style={styles.card}>
      <View style={styles.routeInfo}>
        <Text style={styles.routeTitle}>{title}</Text>
        <View style={styles.frequencyContainer}>
          <Icon name="clock" size={12} color="#666" />
          <Text style={styles.frequencyText}>{frequency}</Text>
        </View>
      </View>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  routeInfo: {
    flex: 1,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    color: (title) => (title.includes("Airport") ? "#001F3F" : "#000"),
  },
  frequencyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  frequencyText: {
    marginLeft: 6,
    color: "#666",
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default RouteCard;
