import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <MaterialIcons name="web" size={24} color="black" />
        <Text style={styles.navText}>Browser</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <FontAwesome name="amazon" size={24} color="black" />
        <Text style={styles.navText}>Amazon</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <MaterialIcons name="diversity-3" size={24} color="black" />
        <Text style={styles.navText}>Diverse</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="server" size={24} color="black" />
        <Text style={styles.navText}>Deserver</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <MaterialIcons name="restaurant" size={24} color="black" />
        <Text style={styles.navText}>Restaurants</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <MaterialIcons name="storage" size={24} color="black" />
        <Text style={styles.navText}>Server</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="search" size={24} color="black" />
        <Text style={styles.navText}>Search</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person" size={24} color="black" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Navbar;