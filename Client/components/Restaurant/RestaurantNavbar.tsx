import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Modal } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface RestaurantNavbarProps {
  onSearch: (query: string) => void;
  onFilter: (filters: { cuisine?: string; priceRange?: string; rating?: number }) => void;
  selectedFilters:SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;

  }

interface SelectedFilters {
  cuisine: string;
  priceRange: string;
  minRating: number;
}


const RestaurantNavbar: React.FC<RestaurantNavbarProps> = ({ onSearch, onFilter,selectedFilters, setSelectedFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = ['All', '$', '$$', '$$$', '$$$$'];
  const ratings = [0, 3, 4, 4.5]; // 0 means no rating filter

  const applyFilters = () => {
    onFilter({
      cuisine: selectedFilters.cuisine === 'All' ? undefined : selectedFilters.cuisine,
      priceRange: selectedFilters.priceRange === 'All' ? undefined : selectedFilters.priceRange,
      rating: selectedFilters.minRating === 0 ? undefined : selectedFilters.minRating,
    });
    setShowFilters(false);
  };

  const resetFilters = () => {
    setSelectedFilters({
      cuisine: '',
      priceRange: '',
      minRating: 0,
    });
    onFilter({});
    setShowFilters(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            onSearch(text);
          }}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Restaurants</Text>

           

            {/* Price Range Filter */}
            <Text style={styles.filterTitle}>Price Range</Text>
            <View style={styles.filterOptions}>
              {priceRanges.map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.filterOption,
                    selectedFilters.priceRange === range && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedFilters({ ...selectedFilters, priceRange: range })}
                >
                  <Text style={selectedFilters.priceRange === range ? styles.selectedOptionText : styles.optionText}>
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Rating Filter */}
            <Text style={styles.filterTitle}>Minimum Rating</Text>
            <View style={styles.filterOptions}>
              {ratings.map((rating) => (
                <TouchableOpacity
                  key={rating.toString()}
                  style={[
                    styles.filterOption,
                    selectedFilters.minRating === rating && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedFilters({ ...selectedFilters, minRating: rating })}
                >
                  <Text style={selectedFilters.minRating === rating ? styles.selectedOptionText : styles.optionText}>
                    {rating === 0 ? 'All' : `${rating}+`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  optionText: {
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff6b6b',
    flex: 1,
    marginRight: 10,
  },
  resetButtonText: {
    color: '#ff6b6b',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  applyButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff6b6b',
    flex: 1,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RestaurantNavbar;