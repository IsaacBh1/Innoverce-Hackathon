import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, router } from "expo-router";

const { width } = Dimensions.get("window");

const GuideProfileScreen = () => {
  const params = useLocalSearchParams();
  const [isBooking, setIsBooking] = useState(false);

  // Parse guide data from URL params
  const guide = {
    id: params.id || "1",
    name: params.name || "Tour Guide",
    phone: params.phone || "+123456789",
    rating: parseFloat(params.rating || "4.5"),
    experience: params.experience || "5 years",
    languages: (params.languages || "English").split(","),
    bio:
      params.bio ||
      "Professional tour guide with extensive knowledge of local culture and history.",
    image: params.image || "https://randomuser.me/api/portraits/men/1.jpg",
  };

  // Sample tour offerings
  const tourOfferings = [
    {
      id: 1,
      title: "Historical City Tour",
      duration: "3 hours",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      title: "Local Food Experience",
      duration: "4 hours",
      price: 60,
      image:
        "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      title: "Hidden Gems Tour",
      duration: "5 hours",
      price: 75,
      image:
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ];

  // Function to render star ratings
  const renderRating = (rating) => {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        starIcons.push(
          <Ionicons key={i} name="star" size={18} color="#FFC107" />
        );
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        starIcons.push(
          <Ionicons key={i} name="star-half" size={18} color="#FFC107" />
        );
      } else {
        starIcons.push(
          <Ionicons key={i} name="star-outline" size={18} color="#FFC107" />
        );
      }
    }
    return <View style={styles.ratingStars}>{starIcons}</View>;
  };

  // Handler for phone button
  const handleCallGuide = () => {
    const phoneNumber = guide.phone.replace(/\s+/g, "");
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Profile Header Section */}
      <View style={styles.headerSection}>
        <Image
          source={{ uri: guide.image }}
          style={styles.headerBackground}
          blurRadius={3}
        />
        <SafeAreaView style={styles.headerContent}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileImageContainer}>
            <Image source={{ uri: guide.image }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{guide.name}</Text>
              <View style={styles.ratingRow}>
                {renderRating(guide.rating)}
                <Text style={styles.ratingText}>
                  {guide.rating.toFixed(1)} ({Math.floor(guide.rating * 100)})
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Quick Info Section */}
        <View style={styles.quickInfoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#0a7ea4" />
            <Text style={styles.infoText}>{guide.experience}</Text>
          </View>
          <View style={styles.infoSeparator} />
          <View style={styles.infoItem}>
            <Ionicons name="globe-outline" size={20} color="#0a7ea4" />
            <Text style={styles.infoText}>{guide.languages.join(", ")}</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{guide.bio}</Text>
        </View>

        {/* Tour Offerings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tour Offerings</Text>
          {tourOfferings.map((tour) => (
            <View key={tour.id} style={styles.tourCard}>
              <Image source={{ uri: tour.image }} style={styles.tourImage} />
              <View style={styles.tourInfo}>
                <Text style={styles.tourTitle}>{tour.title}</Text>
                <View style={styles.tourDetails}>
                  <View style={styles.tourDetail}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{tour.duration}</Text>
                  </View>
                  <View style={styles.tourDetail}>
                    <Ionicons name="cash-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>${tour.price}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.bookTourButton}>
                  <Text style={styles.bookTourText}>Book this tour</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity style={styles.seeAllReviews}>
            <Text style={styles.reviewsCount}>
              {Math.floor(guide.rating * 100)} reviews
            </Text>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Spacing for bottom buttons */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Fixed bottom buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.callButton} onPress={handleCallGuide}>
          <Ionicons name="call" size={24} color="#0a7ea4" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => setIsBooking(true)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    height: 240,
    position: "relative",
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  headerContent: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingStars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  quickInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  infoSeparator: {
    height: 24,
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  tourCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tourImage: {
    width: 100,
    height: 100,
  },
  tourInfo: {
    flex: 1,
    padding: 12,
  },
  tourTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  tourDetails: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tourDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  bookTourButton: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f9ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  bookTourText: {
    color: "#0a7ea4",
    fontSize: 12,
    fontWeight: "500",
  },
  seeAllReviews: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  reviewsCount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0a7ea4",
  },
  bottomButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  callButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#0a7ea4",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  bookButton: {
    flex: 1,
    backgroundColor: "#0a7ea4",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GuideProfileScreen;
