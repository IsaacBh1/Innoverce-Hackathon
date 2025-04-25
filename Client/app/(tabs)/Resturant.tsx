import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Restaurant, restaurants } from "../../constants/types";
import Card from "../../components/ui/Card";
import RestaurantNavbar from "@/components/Restaurant/RestaurantNavbar";
import { Ionicons } from "@expo/vector-icons";

const RestaurantsScreen = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [data, setData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: "",
    priceRange: "",
    minRating: 0,
  });

  const handleCardPress = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalVisible(true);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch("http://192.168.31.11:8000/api/hotals")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      onPress={() => handleCardPress(item)} // Show modal with selected restaurant's details
      activeOpacity={0.8}
    >
      <Card style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.cuisine}>{item.cuisine}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
            <Text style={styles.deliveryTime}>⏱ {item.deliveryTime}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  // Error content component
  const ErrorContent = ({ message }: { message: string }) => (
    <View style={styles.errorContainer}>
      <Ionicons name="wifi-outline" size={64} color="#0a7ea4" />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
          <Text style={styles.loadingText}>Loading restaurants...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <ErrorContent message="Connection error. Please check your internet and try again." />
      );
    }

    if (data.length === 0) {
      return (
        <ErrorContent message="No restaurants found. Please try again later." />
      );
    }

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    );
  };

  return (
    <View style={styles.container}>
      <RestaurantNavbar
        onSearch={() => {}}
        onFilter={() => {}}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {renderContent()}

      {/* Modal for displaying restaurant details */}
      {selectedRestaurant && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)} // Close modal on back press
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Image
                  source={{ uri: selectedRestaurant.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalName}>{selectedRestaurant.name}</Text>
                <Text style={styles.modalCuisine}>
                  {selectedRestaurant.cuisine}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedRestaurant.description}
                </Text>
                <Text style={styles.modalPopularDishes}>
                  Popular Dishes:
                  {selectedRestaurant.dishes?.map((dish, index) => (
                    <Text key={index} style={styles.modalDish}>
                      {dish.name}
                    </Text>
                  ))}
                </Text>
                <Text style={styles.modalRating}>
                  Rating: {selectedRestaurant.rating} ⭐
                </Text>
                <Text style={styles.modalDeliveryTime}>
                  Delivery Time: {selectedRestaurant.deliveryTime}
                </Text>
                <Text style={styles.modalPriceRange}>
                  Price Range: {selectedRestaurant.priceRange}
                </Text>
                <Button
                  title="Close"
                  color={"#0a7ea4"}
                  onPress={() => setModalVisible(false)}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cuisine: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    fontSize: 14,
  },
  deliveryTime: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  modalName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalCuisine: {
    fontSize: 18,
    color: "#777",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  modalPopularDishes: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
  },
  modalDish: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
  modalRating: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalDeliveryTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalPriceRange: {
    fontSize: 16,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default RestaurantsScreen;
