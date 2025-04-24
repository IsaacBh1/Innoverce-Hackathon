import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TransportFilterItem from "./TransportFilterItem";

const TransportFilter = ({ options, selectedFilter, onSelectFilter }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {options.slice(0, 2).map((option) => (
          <TransportFilterItem
            key={option.id}
            title={option.title}
            icon={option.icon}
            selected={selectedFilter === option.title}
            onSelect={() => onSelectFilter(option.title)}
          />
        ))}
      </View>
      <View style={styles.row}>
        {options.slice(2, 4).map((option) => (
          <TransportFilterItem
            key={option.id}
            title={option.title}
            icon={option.icon}
            selected={selectedFilter === option.title}
            onSelect={() => onSelectFilter(option.title)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});

export default TransportFilter;
