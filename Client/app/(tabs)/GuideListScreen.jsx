import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import GuideCard from "../../components/GuideCard";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";

const GUIDES = [
  {
    id: 1,
    name: "John Smith",
    phone: "+1 234 567 890",
    rating: 4.8,
    experience: "5 years",
    languages: ["English", "Spanish"],
    bio: "Certified tour guide specializing in historical tours and cultural experiences.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Maria Garcia",
    phone: "+1 345 678 901",
    rating: 4.9,
    experience: "7 years",
    languages: ["Spanish", "French"],
    bio: "Expert in culinary tours and local gastronomy experiences.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Liam Nguyen",
    phone: "+1 456 789 012",
    rating: 4.7,
    experience: "4 years",
    languages: ["Vietnamese", "English"],
    bio: "Local expert in street food and hidden city gems.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Sofia Rossi",
    phone: "+1 567 890 123",
    rating: 5.0,
    experience: "10 years",
    languages: ["Italian", "English"],
    bio: "Passionate about art, architecture, and Italian history.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

// Filter categories for tour guides
const FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "top_rated", label: "Top Rated" },
  { id: "english", label: "English" },
  { id: "experience", label: "Most Experienced" },
];

const GuideListScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [guides, setGuides] = useState(GUIDES);

  const handleSearch = (text) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setGuides(GUIDES);
      return;
    }

    const filtered = GUIDES.filter(
      (guide) =>
        guide.name.toLowerCase().includes(text.toLowerCase()) ||
        guide.languages.some((lang) =>
          lang.toLowerCase().includes(text.toLowerCase())
        ) ||
        guide.bio.toLowerCase().includes(text.toLowerCase())
    );

    setGuides(filtered);
  };

  const handleFilterSelect = (filterId) => {
    setSelectedFilter(filterId);

    let filtered = [...GUIDES];

    switch (filterId) {
      case "top_rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "english":
        filtered = filtered.filter((guide) =>
          guide.languages.includes("English")
        );
        break;
      case "experience":
        filtered.sort((a, b) => {
          const aYears = parseInt(a.experience.split(" ")[0]);
          const bYears = parseInt(b.experience.split(" ")[0]);
          return bYears - aYears;
        });
        break;
      default:
        // 'all' - no filtering needed
        break;
    }

    setGuides(filtered);
  };

  const handleGuidePress = (guide) => {
    console.log("Navigating to guide:", guide.name);
    router.push({
      pathname: "/GuideProfileScreen",
      params: {
        id: guide.id.toString(),
        name: guide.name,
        phone: guide.phone,
        rating: guide.rating.toString(),
        experience: guide.experience,
        languages: guide.languages.join(","),
        bio: guide.bio,
        image: guide.image,
      },
    });
  };

  // Filter option component
  const FilterOption = ({ option, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.filterOption, isSelected && styles.filterOptionSelected]}
      onPress={() => onPress(option.id)}
    >
      <Text
        style={[styles.filterText, isSelected && styles.filterTextSelected]}
      >
        {option.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search guides, languages..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Guide List */}
      <FlatList
        contentContainerStyle={styles.list}
        data={guides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GuideCard guide={item} onPress={() => handleGuidePress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No guides found</Text>
            <Text style={styles.emptySubtext}>Try different search terms</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0a7ea4",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterList: {
    paddingHorizontal: 16,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  filterOptionSelected: {
    backgroundColor: "#0a7ea4",
  },
  filterText: {
    fontSize: 14,
    color: "#333",
  },
  filterTextSelected: {
    color: "white",
    fontWeight: "500",
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
  },
  list: {
    padding: 16,
    paddingTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default GuideListScreen;
