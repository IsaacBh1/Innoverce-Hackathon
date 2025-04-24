import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Button, ScrollView } from 'react-native';
import { Restaurant ,restaurants } from '../../constants/types';
import Card from '../../components/ui/Card';
import RestaurantNavbar from '@/components/Restaurant/RestaurantNavbar';


const RestaurantsScreen = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: '',
    priceRange: '',
    minRating: 0,
  });

  const handleCardPress = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalVisible(true);
  };

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
  console.log(selectedFilters)

  return (
    <View style={styles.container}>
      <RestaurantNavbar onSearch={() => {}} onFilter={() => {}}   selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}  />
      <FlatList
        data={filteredRestaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

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
                <Image source={{ uri: selectedRestaurant.image }} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedRestaurant.name}</Text>
                <Text style={styles.modalCuisine}>{selectedRestaurant.cuisine}</Text>
                <Text style={styles.modalDescription}>{selectedRestaurant.description}</Text>
                <Text style={styles.modalPopularDishes}>Popular Dishes:</Text>
                {selectedRestaurant.popularDishes?.map((dish, index) => (
                  <Text key={index} style={styles.modalDish}>{dish}</Text>
                ))}
                <Text style={styles.modalRating}>Rating: {selectedRestaurant.rating} ⭐</Text>
                <Text style={styles.modalDeliveryTime}>Delivery Time: {selectedRestaurant.deliveryTime}</Text>
                <Text style={styles.modalPriceRange}>Price Range: {selectedRestaurant.priceRange}</Text>
                <Button title="Close" color={"#0a7ea4"} onPress={() => setModalVisible(false)} />
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
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 14,
  },
  deliveryTime: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCuisine: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  modalPopularDishes: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDish: {
    fontSize: 16,
    color: '#444',
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
});

export default RestaurantsScreen;
