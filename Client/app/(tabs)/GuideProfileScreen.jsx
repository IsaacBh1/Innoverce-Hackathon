import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

const GuideProfileScreen = ({ guide = {} }) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: guide.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{guide.name}</Text>
        <Text style={styles.bio}>{guide.bio}</Text>

        <View style={styles.section}>
          <Icon name="call" size={18} color={Colors.light.primary} />
          <Text style={styles.text}>{guide.phone}</Text>
        </View>

        <View style={styles.section}>
          <Icon name="star" size={18} color={Colors.light.accent} />
          <Text style={styles.text}>Rating: {guide.rating}/5</Text>
        </View>

        <View style={styles.section}>
          <Icon name="briefcase" size={18} color={Colors.light.primary} />
          <Text style={styles.text}>Experience: {guide.experience}</Text>
        </View>

        <View style={styles.section}>
          <Icon name="language" size={18} color={Colors.light.primary} />
          <Text style={styles.text}>
            Languages: {(guide.languages || []).join(", ")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.primary,
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 20,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.light.text,
  },
});

export default GuideProfileScreen;
