import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import TransportFilterItem from "./TransportFilterItem";

const TransportFilter = ({ options, selectedFilter, onSelectFilter }) => {
  // Split options into rows based on number of options
  // If there are 4 options, we'll have 2 rows with 2 options each
  // If there are more, we adjust accordingly
  const rowSize = Math.ceil(options.length / 2);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {options.slice(0, rowSize).map((option) => (
          <TransportFilterItem
            key={option.id}
            title={option.title}
            icon={option.icon}
            selected={selectedFilter === option.title}
            onSelect={() => {
              onSelectFilter(option.title);
            }}
          />
        ))}
      </View>
      <View style={styles.row}>
        {options.slice(rowSize).map((option) => (
          <TransportFilterItem
            key={option.id}
            title={option.title}
            icon={option.icon}
            selected={selectedFilter === option.title}
            onSelect={() => {
              onSelectFilter(option.title);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default TransportFilter;
