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

  // Transport filter options data
  const transportFilters = [
    { id: "1", title: "All", icon: "train-car" },
    { id: "2", title: "taxi", icon: "car" },
    { id: "3", title: "Bus", icon: "bus" },
    { id: "4", title: "tramway", icon: "train" },
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
            onSelectFilter={setSelectedFilter}
          />
          <LocationMap />
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
