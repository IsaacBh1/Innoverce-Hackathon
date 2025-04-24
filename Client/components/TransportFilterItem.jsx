import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransportFilterItem = ({ title, icon, selected, onSelect }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, selected && styles.selectedCard]} 
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <Icon 
        name={icon} 
        size={22} 
        color={selected ? '#0a7ea4' : '#0a7ea4'} 
        style={styles.icon}
      />
      <Text style={[styles.title, selected && styles.selectedTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  selectedCard: {
    borderColor: '#0a7ea4',
    borderWidth: 1,
    backgroundColor: '#eeeeee',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
  },
  selectedTitle: {
    fontWeight: '600',
  },
});

export default TransportFilterItem;
