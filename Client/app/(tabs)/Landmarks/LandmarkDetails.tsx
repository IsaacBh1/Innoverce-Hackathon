import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  Platform,
  FlatList,
  StatusBar,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Landmark, LandmarkImage } from "./types";

const { width: screenWidth } = Dimensions.get("window");

// Simple dot pagination component
const PaginationDots = ({
  total,
  current,
}: {
  total: number;
  current: number;
}) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === current ? styles.paginationDotActive : null,
          ]}
        />
      ))}
    </View>
  );
};

// Image carousel component using FlatList
const ImageCarousel = ({ images }: { images: LandmarkImage[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <View style={{ width: screenWidth }}>
            <Image
              source={{ uri: item.url }}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
        windowSize={1}
      />
      <PaginationDots total={images.length} current={activeIndex} />
    </View>
  );
};

// Tab button component for the description/info tabs
const TabButton = ({
  title,
  isActive,
  onPress,
}: {
  title: string;
  isActive: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.tabButton, isActive && styles.activeTabButton]}
    onPress={onPress}
  >
    <Text
      style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

interface LandmarkDetailsProps {
  landmark: Landmark;
  onToggleFavorite: (id: string) => void;
}

const LandmarkDetails = ({
  landmark,
  onToggleFavorite,
}: LandmarkDetailsProps) => {
  const [activeTab, setActiveTab] = useState<"description" | "info">(
    "description"
  );
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  // Open map with landmark location
  const openInMaps = () => {
    const { latitude, longitude } = landmark.location;
    const label = encodeURIComponent(landmark.name);

    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });

    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  // Render stars based on rating
  const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    const halfStar = score - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome
          key={`full-${i}`}
          name="star"
          size={16}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }

    // Half star if applicable
    if (halfStar) {
      stars.push(
        <FontAwesome
          key="half"
          name="star-half-o"
          size={16}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome
          key={`empty-${i}`}
          name="star-o"
          size={16}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }

    return <View style={{ flexDirection: "row" }}>{stars}</View>;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Image Carousel */}
        <View style={styles.carouselWrapper}>
          <ImageCarousel images={landmark.images} />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Favorite button */}
          <TouchableOpacity
            style={styles.favoriteIconButton}
            onPress={() => onToggleFavorite(landmark.id)}
          >
            <Ionicons
              name={landmark.isFavorite ? "bookmark" : "bookmark-outline"}
              size={24}
              color={landmark.isFavorite ? "#0a7ea4" : "#333"}
            />
          </TouchableOpacity>
        </View>

        {/* Landmark Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.nameRatingRow}>
            <Text style={styles.landmarkName}>{landmark.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#FFC107" />
              <Text style={styles.ratingScore}>
                {landmark.rating.score.toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.categoryRow}>
            <Ionicons name="pricetag-outline" size={16} color="#666" />
            <Text style={styles.categoryText}>{landmark.category}</Text>
          </View>

          <TouchableOpacity style={styles.locationRow} onPress={openInMaps}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationText}>{landmark.location.address}</Text>
            <Ionicons name="open-outline" size={16} color="#666" />
          </TouchableOpacity>

          <View style={styles.ratingDetailsRow}>
            <Text style={styles.ratingLabel}>Rating: </Text>
            {renderStars(landmark.rating.score)}
            <Text style={styles.reviewCount}>
              ({landmark.rating.count} reviews)
            </Text>
          </View>
        </View>

        {/* Description/Info Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsHeader}>
            <TabButton
              title="Description"
              isActive={activeTab === "description"}
              onPress={() => setActiveTab("description")}
            />
            <TabButton
              title="Opening Hours"
              isActive={activeTab === "info"}
              onPress={() => setActiveTab("info")}
            />
          </View>

          {activeTab === "description" && (
            <View style={styles.tabContent}>
              <Text style={styles.descriptionText}>{landmark.description}</Text>
            </View>
          )}

          {activeTab === "info" && (
            <View style={styles.tabContent}>
              <Text style={styles.hoursTitle}>Opening Hours:</Text>
              {landmark.openingHours.map((item, index) => (
                <View key={index} style={styles.hourRow}>
                  <Text style={styles.dayText}>{item.day}:</Text>
                  <Text style={styles.hoursText}>{item.hours}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Bottom spacing for fixed buttons */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Fixed bottom buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            landmark.isFavorite && {
              backgroundColor: "#f0f8ff",
              borderColor: "#0a7ea4",
            },
          ]}
          onPress={() => onToggleFavorite(landmark.id)}
        >
          <Ionicons
            name={landmark.isFavorite ? "bookmark" : "bookmark-outline"}
            size={24}
            color={landmark.isFavorite ? "#0a7ea4" : "#666"}
          />
          <Text
            style={[
              styles.buttonText,
              { color: landmark.isFavorite ? "#0a7ea4" : "#666" },
            ]}
          >
            {landmark.isFavorite ? "Saved" : "Save to Favorites"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigateButton} onPress={openInMaps}>
          <Ionicons name="navigate" size={24} color="white" />
          <Text style={styles.navigateButtonText}>Navigate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  carouselWrapper: {
    position: "relative",
  },
  carouselContainer: {
    height: 250,
  },
  carouselImage: {
    width: screenWidth,
    height: 250,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteIconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoSection: {
    padding: 16,
  },
  nameRatingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  landmarkName: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
    color: "#666",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F9FB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingScore: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
    color: "#666",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 15,
    marginLeft: 6,
    fontWeight: "500",
    color: "#666",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 4,
  },
  locationText: {
    flex: 1,
    fontSize: 15,
    marginHorizontal: 6,
    color: "#666",
  },
  ratingDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingLabel: {
    fontSize: 15,
    fontWeight: "500",
    marginRight: 4,
    color: "#666",
  },
  reviewCount: {
    fontSize: 14,
    marginLeft: 6,
    color: "#666",
  },
  tabsContainer: {
    padding: 16,
    borderTopWidth: 8,
    borderTopColor: "#f5f5f5",
  },
  tabsHeader: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#0a7ea4",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  activeTabButtonText: {
    color: "#0a7ea4",
    fontWeight: "bold",
  },
  tabContent: {
    paddingVertical: 8,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666",
  },
  hoursTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#666",
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dayText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
  },
  hoursText: {
    fontSize: 15,
    color: "#666",
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  favoriteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  navigateButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: "#0a7ea4",
  },
  navigateButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default LandmarkDetails;
