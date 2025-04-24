import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import GuideCard from "../../components/GuideCard";

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

const GuideListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={GUIDES}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GuideCard
            guide={item}
            onPress={() => navigation.navigate("GuideProfile", { guide })}
            />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#F5F5F5",
  },
  list: {
    padding: 16,
  },
});

export default GuideListScreen;


