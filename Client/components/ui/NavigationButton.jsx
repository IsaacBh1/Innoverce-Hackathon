import { View, Text } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
const NavigationButton = ({ name, icon }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Feather name={icon} size={22} color="#999" />
      <Text>test</Text>
    </View>
  );
};

export default NavigationButton;
