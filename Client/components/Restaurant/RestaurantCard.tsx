// components/RestaurantCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type RestaurantCardProps = {
  name: string;
  category: string;
  image: string;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, category, image }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.category}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  category: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 10,
    paddingBottom: 10,
  },
});

export default RestaurantCard;
