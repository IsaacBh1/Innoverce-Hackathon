import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "../../../hooks/useColorScheme";
import LandmarkDetails from "./LandmarkDetails";
import { mockLandmarks } from "./mockData";
import { Landmark } from "./types";

export default function LandmarkDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  // Find the landmark with matching ID
  const initialLandmark = mockLandmarks.find((item) => item.id === id);

  // State to track favorite status
  const [landmarkData, setLandmarkData] = useState<Landmark | undefined>(
    initialLandmark
  );

  // Handle toggling the favorite status
  const handleToggleFavorite = (landmarkId: string) => {
    if (landmarkData) {
      setLandmarkData({
        ...landmarkData,
        isFavorite: !landmarkData.isFavorite,
      });
    }
  };

  // Handle navigation back (this is handled by the Stack navigation in this case)
  const handleClose = () => {
    // In a standalone page this would redirect back, but Stack.Back handles this
    // No need for additional code here as the Back button is provided by Stack
  };

  if (!landmarkData) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: landmarkData.name,
          headerBackTitle: "Landmarks",
        }}
      />
      <LandmarkDetails
        landmark={landmarkData}
        onToggleFavorite={handleToggleFavorite}
        onClose={handleClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
