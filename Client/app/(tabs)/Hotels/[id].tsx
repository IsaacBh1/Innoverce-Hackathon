import React, { useState, useEffect, useRef } from "react";
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
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { mockHotels } from "./mockData";
import { Hotel, HotelImage } from "./types";

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
const ImageCarousel = ({ images }: { images: HotelImage[] }) => {
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
      />
      <PaginationDots total={images.length} current={activeIndex} />
    </View>
  );
};

// Amenity item component
const AmenityItem = ({ icon, name }: { icon: string; name: string }) => {
  return (
    <View style={styles.amenityItem}>
      <View style={styles.amenityIconContainer}>
        <Ionicons name={icon as any} size={20} color="#0a7ea4" />
      </View>
      <Text style={styles.amenityName}>{name}</Text>
    </View>
  );
};

// Tab button component for the description/reviews tabs
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

const HotelDetails = () => {
  const { id } = useLocalSearchParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const router = useRouter();

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  // Find the hotel data
  useEffect(() => {
    if (id) {
      const foundHotel = mockHotels.find((h) => h.id === id);
      if (foundHotel) {
        setHotel(foundHotel);
      }
      setLoading(false);
    }
  }, [id]);

  // Toggle favorite status
  const toggleFavorite = () => {
    // Implementation would update favorite status
    console.log("Toggle favorite");
  };

  // Open map with hotel location
  const openInMaps = () => {
    if (!hotel) return;

    const { latitude, longitude } = hotel.coordinates;
    const label = encodeURIComponent(hotel.name);

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

  // Call hotel
  const callHotel = () => {
    if (hotel) {
      Linking.openURL(`tel:${hotel.contactNumber}`);
    }
  };

  // Handle booking
  const handleBooking = () => {
    console.log("Booking initiated");
    // Implementation would navigate to booking screen
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  if (!hotel) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Hotel not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Carousel */}
          <View style={styles.carouselWrapper}>
            <ImageCarousel images={hotel.images} />

            {/* Back and Favorite buttons */}
            <TouchableOpacity
              style={styles.backIconButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteIconButton}
              onPress={toggleFavorite}
            >
              <Ionicons name="bookmark-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Hotel Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.nameRatingRow}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#FFC107" />
                <Text style={styles.ratingScore}>
                  {hotel.rating.score.toFixed(1)}
                </Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.locationText}>{hotel.address}</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceUnit}>From </Text>
              <Text style={styles.priceAmount}>
                {hotel.price.current.toLocaleString()} {hotel.price.currency}
              </Text>
              <Text style={styles.priceUnit}>/night</Text>
            </View>
          </View>

          {/* Description/Reviews Tabs */}
          <View style={styles.tabsContainer}>
            <View style={styles.tabsHeader}>
              <TabButton
                title="Description"
                isActive={activeTab === "description"}
                onPress={() => setActiveTab("description")}
              />
              <TabButton
                title="Highlights"
                isActive={activeTab === "reviews"}
                onPress={() => setActiveTab("reviews")}
              />
            </View>

            {activeTab === "description" && (
              <View style={styles.tabContent}>
                <Text style={styles.descriptionText}>
                  {hotel.description || "No description available."}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.readMoreText}>Read More</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeTab === "reviews" && (
              <View>
                <View style={styles.highlightsContainer}>
                  {/* Room Types */}
                  <View style={styles.highlightItem}>
                    <Ionicons
                      name="bed-outline"
                      size={20}
                      color={colors.tint}
                    />
                    <View style={styles.highlightContent}>
                      <Text style={[styles.highlightTitle, { color: "#666" }]}>
                        Room Types
                      </Text>
                      <View style={styles.roomTypesRow}>
                        {hotel.roomTypes.map((room, index) => (
                          <View key={index} style={styles.roomTypeTag}>
                            <Text style={styles.roomTypeText}>{room.name}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  {/* Contact Information */}
                  <TouchableOpacity
                    style={styles.highlightItem}
                    onPress={callHotel}
                  >
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color={colors.tint}
                    />
                    <View style={styles.highlightContent}>
                      <Text style={[styles.highlightTitle, { color: "#666" }]}>
                        Contact Number
                      </Text>
                      <Text
                        style={[styles.highlightValue, { color: colors.icon }]}
                      >
                        {hotel.contactNumber}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Spacer for the fixed bottom button */}
          <View style={{ height: 80 }} />
        </ScrollView>

        {/* Fixed bottom buttons - Navigate and Book (disabled) */}
        <View style={styles.bookButtonContainer}>
          <TouchableOpacity style={styles.navigateButton} onPress={openInMaps}>
            <Ionicons name="navigate" size={20} color="white" />
            <Text style={styles.buttonText}>Navigate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.disabledBookButton} disabled={true}>
            {/* Coming Soon: Book with points */}
            <View
              style={[styles.comingSoonContainer, { borderColor: colors.icon }]}
            >
              <Text style={[styles.comingSoonTitle, { color: colors.text }]}>
                Book with points
              </Text>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0a7ea4",
  },
  scrollView: {
    flex: 1,
  },
  carouselWrapper: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
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
  backIconButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
  hotelName: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
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
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0a7ea4",
  },
  priceUnit: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  sectionContainer: {
    padding: 16,
    borderTopWidth: 8,
    borderTopColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  amenitiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  amenityItem: {
    alignItems: "center",
    width: "22%",
    marginBottom: 12,
  },
  amenityIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F5F9FB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  amenityName: {
    fontSize: 12,
    color: "#333",
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
    paddingTop: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0a7ea4",
    marginTop: 8,
  },
  reviewsText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
  },
  roomTypeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  roomTypeName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  roomTypeDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  roomTypePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0a7ea4",
  },
  bookButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookButton: {
    backgroundColor: "#0a7ea4",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bookButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  navigateButton: {
    backgroundColor: "#0a7ea4",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginRight: 8,
  },
  disabledBookButton: {
    backgroundColor: "#cccccc",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  disabledButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Styles for Highlights section
  highlightsContainer: {
    padding: 16,
    borderTopWidth: 0,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
  },
  highlightContent: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 14,
  },
  roomTypesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  roomTypeTag: {
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  roomTypeText: {
    fontSize: 14,
    color: "#0a7ea4",
  },

  // Coming Soon section styles
  comingSoonContainer: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    position: "relative",
    width: "100%",
    height: "100%",
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  comingSoonBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#FF9800",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderBottomLeftRadius: 8,
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});
export default HotelDetails;
