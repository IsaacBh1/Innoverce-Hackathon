import React, { useEffect, useState } from "react";
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
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Hotel } from "./types";
import { mockHotels } from "./mockData";
import { router } from "expo-router";

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
          placeholder="Search hotels in Oran"
          placeholderTextColor="#999"
          returnKeyType="search"
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  );
};

// Hotel card component
const HotelCard = ({
  hotel,
  onPress,
  onToggleFavorite,
}: {
  hotel: Hotel;
  onPress: () => void;
  onToggleFavorite: (id: string) => void;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image
        source={{ uri: hotel.images[0].url }}
        style={styles.hotelImage}
        resizeMode="cover"
      />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.hotelName} numberOfLines={1}>
            {hotel.name}
          </Text>
          <TouchableOpacity
            onPress={() => onToggleFavorite(hotel.id)}
            style={styles.favoriteButton}
          >
            <Ionicons
              name={hotel.isFavorite ? "bookmark" : "bookmark-outline"}
              size={22}
              color={hotel.isFavorite ? "#0a7ea4" : "#888"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.locationText} numberOfLines={1}>
            {hotel.address.split(",")[0]}, Algeria
          </Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>{hotel.rating.score.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({hotel.rating.count}+)</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {hotel.price.current.toLocaleString()} {hotel.price.currency}
            <Text style={styles.nightText}>/night</Text>
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

// Main component
const Hotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Toggle favorite status for a hotel
  const toggleFavorite = (id: string) => {
    setHotels(
      hotels.map((hotel) =>
        hotel.id === id ? { ...hotel, isFavorite: !hotel.isFavorite } : hotel
      )
    );
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setHotels(mockHotels);
      return;
    }

    const filtered = mockHotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setHotels(filtered);
  };

  // Navigate to hotel details
  const navigateToHotelDetails = (hotelId: string) => {
    router.push(`/Hotels/${hotelId}`);
  };
 
  

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
      />

      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HotelCard
            hotel={item}
            onPress={() => navigateToHotelDetails(item.id)}
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
  hotelImage: {
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
  hotelName: {
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
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
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
  priceRow: {
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0a7ea4",
  },
  nightText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#666",
  },
});

export default Hotels;
