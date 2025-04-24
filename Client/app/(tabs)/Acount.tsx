import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinedDate: string;
  favoriteRestaurants: number;
  reviews: number;
}

const Account = () => {
  const [user, setUser] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    joinedDate: 'January 2023',
    favoriteRestaurants: 12,
    reviews: 8,
  });

  const [editing, setEditing] = useState(false);

  // In a real app, you would fetch this data from your backend
  useEffect(() => {
    // fetchUserProfile().then(data => setUser(data));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navs}></View>
       <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: user.avatar || 'https://via.placeholder.com/150' }} 
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.memberSince}>Member since {user.joinedDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.infoItem}>
          <Ionicons name="mail" size={20} color="#666" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        
        {user.phone && (
          <View style={styles.infoItem}>
            <Ionicons name="call" size={20} color="#666" />
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.favoriteRestaurants}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.reviews}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => setEditing(!editing)}
      >
        <Text style={styles.editButtonText}>
          {editing ? 'Save Profile' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navs:{
    height:20,
    backgroundColor:"#f8f8f8"
  },
  container: {
    marginTop:10,
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: '#0a7ea4',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberSince: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  editButton: {
    backgroundColor: '#0a7ea4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Account;