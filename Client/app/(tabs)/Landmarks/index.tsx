import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { mockLandmarks } from "./mockData";
import { Landmark } from "./types";

// Search bar component
const SearchBar = ({
  value,
  onChangeText,
  onSubmit,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}) => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchInputContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search landmarks in Oran"
          placeholderTextColor="#999"
          returnKeyType="search"
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  );
};

// Landmark card component
const LandmarkCard = ({
  landmark,
  onPress,
  onToggleFavorite,
}: {
  landmark: Landmark;
  onPress: () => void;
  onToggleFavorite: (id: string) => void;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image
        source={{ uri: landmark.images[0].url }}
        style={styles.landmarkImage}
        resizeMode="cover"
      />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.landmarkName} numberOfLines={1}>
            {landmark.name}
          </Text>
          <TouchableOpacity
            onPress={() => onToggleFavorite(landmark.id)}
            style={styles.favoriteButton}
          >
            <Ionicons
              name={landmark.isFavorite ? "bookmark" : "bookmark-outline"}
              size={22}
              color={landmark.isFavorite ? "#0a7ea4" : "#888"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.locationText} numberOfLines={1}>
            {landmark.location.address.split(",")[0]}, Algeria
          </Text>
        </View>

        <View style={styles.categoryRow}>
          <Ionicons name="pricetag-outline" size={14} color="#666" />
          <Text style={styles.categoryText}>{landmark.category}</Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>
            {landmark.rating.score.toFixed(1)}
          </Text>
          <Text style={styles.ratingCount}>
            ({landmark.rating.count}+ reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Section title component
const SectionTitle = ({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll: () => void;
}) => {
  return (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};

const Landmarks = () => {
  const [landmarks, setLandmarks] = useState<Landmark[]>(mockLandmarks);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  // Toggle favorite status for a landmark
  const toggleFavorite = (id: string) => {
    setLandmarks(
      landmarks.map((landmark) =>
        landmark.id === id
          ? { ...landmark, isFavorite: !landmark.isFavorite }
          : landmark
      )
    );
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setLandmarks(mockLandmarks);
      return;
    }

    const filtered = mockLandmarks.filter(
      (landmark) =>
        landmark.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        landmark.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        landmark.location.address
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

    setLandmarks(filtered);
  };

  // Navigate to landmark details page
  const navigateToLandmarkDetails = (landmark: Landmark) => {
    router.push(`/Landmarks/${landmark.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
      />

      <FlatList
        data={landmarks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <SectionTitle
            title="Popular Landmarks"
            onSeeAll={() => console.log("See all landmarks")}
          />
        )}
        renderItem={({ item }) => (
          <LandmarkCard
            landmark={item}
            onPress={() => navigateToLandmarkDetails(item)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: "100%",
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#0a7ea4",
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    margin: 16,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  landmarkImage: {
    width: "100%",
    height: 140,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  landmarkName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 14,
    color: "#0a7ea4",
    marginLeft: 4,
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 13,
    color: "#666",
  },
});

export default Landmarks;
