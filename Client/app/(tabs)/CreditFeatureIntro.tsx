import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    title: "One Wallet for All Transport",
    description:
      "Buy once. Ride anything. Buses, trains, taxis—no separate tickets.",
    icon: "wallet-outline",
    color: "#4e85f4",
  },
  {
    title: "Faster Checkouts",
    description: "Skip queues and taps. Your credits are always ready.",
    icon: "timer-outline",
    color: "#6c5ce7",
  },
  {
    title: "Track Your Spend Easily",
    description: "See how you travel and where your credits go.",
    icon: "analytics-outline",
    color: "#00b894",
  },
  {
    title: "Perfect for Tourists",
    description:
      "Top up once and enjoy the city—no need for local payment methods.",
    icon: "airplane-outline",
    color: "#fdcb6e",
  },
];

export default function CreditFeatureIntro() {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={100} color={item.color} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />

      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor:
                    index === currentIndex ? "#0a7ea4" : "#c2c2c2",
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    width,
    height: height * 0.8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 50,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(240, 240, 240, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  textContainer: {
    alignItems: "center",
    maxWidth: "90%",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0a7ea4",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    lineHeight: 26,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
});
