import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
const GuideCard = ({ guide }) => {
  // Function to handle phone call
  const handlePhoneCall = () => {
    if (guide.phone) {
      const sanitizedPhone = guide.phone.replace(/\s+/g, "");

      Linking.openURL(`tel:${sanitizedPhone}`);
    }
  };

  // Render language badges
  const renderLanguageBadges = (languages) => (
    <View style={styles.languagesContainer}>
      {languages.map((language, index) => (
        <View key={index} style={styles.languageBadge}>
          <Text style={styles.languageText}>{language}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.topSection}>
        <Image source={{ uri: guide.image }} style={styles.image} />
        <View style={styles.topInfo}>
          <Text style={styles.name}>{guide.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.ratingText}>{guide.rating.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>({guide.rating * 100})</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handlePhoneCall}
        >
          <Ionicons name="call-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#0a7ea4" />
          <Text style={styles.detailText}>{guide.experience} experience</Text>
        </View>
        {renderLanguageBadges(guide.languages)}
      </View>

      <Text style={styles.bio} numberOfLines={3}>
        {guide.bio}
      </Text>

      <View style={styles.phoneContainer}>
        <Ionicons name="call" size={16} color="#0a7ea4" />
        <Text style={styles.phoneText}>
          {guide.phone || "No phone number available"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  topInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  contactButton: {
    backgroundColor: "#0a7ea4",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
  detailsSection: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  languageBadge: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  languageText: {
    fontSize: 12,
    color: "#0a7ea4",
  },
  bio: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  phoneText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
});

export default GuideCard;
