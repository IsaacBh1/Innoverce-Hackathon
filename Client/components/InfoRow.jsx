import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';

const InfoRow = ({ iconName, iconColor, text }) => {
  return (
    <View style={styles.infoRow}>
      <Icon name={iconName} size={20} color={iconColor} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
  },
});

export default InfoRow;

