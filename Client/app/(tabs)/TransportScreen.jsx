import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
} from "react-native";
import Header from "@/components/Header";
import TransportFilter from "@/components/TransportFilter";
import LocationMap from "@/components/LocationMap";

const TransportScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const handleFilterChange = (type) => {
    setSelectedFilter(type);
  };
  // Transport filter options data - ensure titles match exact types in transportMockData.js
  const transportFilters = [
    { id: "1", title: "All", icon: "train-car" },
    { id: "2", title: "taxi", icon: "car" },
    { id: "3", title: "bus", icon: "bus" },
    { id: "4", title: "tram", icon: "train" }, // Changed from "tramway" to "tram" to match the data
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <TransportFilter
            options={transportFilters}
            selectedFilter={selectedFilter}
            onSelectFilter={handleFilterChange}
          />
          <LocationMap type={selectedFilter} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default TransportScreen;
