import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/Colors";

const GuideCard = ({ guide, onPress }) => {
  const renderRating = (rating) => (
    <View style={styles.ratingContainer}>
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          name={i < Math.floor(rating) ? "star" : "star-outline"}
          size={16}
          color={Colors.light.accent}
        />
      ))}
      <Text style={styles.ratingText}>({rating.toFixed(1)})</Text>
    </View>
  );

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: guide.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{guide.name}</Text>
        {renderRating(guide.rating)}
        <Text style={styles.detail}>Experience: {guide.experience}</Text>
        <Text style={styles.detail}>Languages: {guide.languages.join(", ")}</Text>
        <Text style={styles.bio}>{guide.bio}</Text>
        <View style={styles.phoneRow}>
          <Icon name="call-outline" size={16} color={Colors.light.primary} />
          <Text style={styles.phone}>{guide.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.primary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 13,
    color: Colors.light.text,
  },
  detail: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 2,
  },
  bio: {
    fontSize: 13,
    color: Colors.light.textSecondary || Colors.light.text,
    marginVertical: 4,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  phone: {
    fontSize: 14,
    marginLeft: 6,
    color: Colors.light.text,
  },
});

export default GuideCard;
