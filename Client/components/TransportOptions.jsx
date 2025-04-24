import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TransportCard from "./TransportCard.jsx";

const TransportOptions = ({ options }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {options.slice(0, 2).map((option) => (
          <TransportCard
            key={option.id}
            title={option.title}
            icon={option.icon}
          />
        ))}
      </View>
      <View style={styles.row}>
        {options.slice(2, 4).map((option) => (
          <TransportCard
            key={option.id}
            title={option.title}
            icon={option.icon}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default TransportOptions;
