import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout for 2 seconds before navigating
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)");
    }, 2000);

    // Clear the timeout if component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://iili.io/3MgJxN2.th.png" }}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>
        Seamless travel. Effortless discovery.
      </Text>

      <ActivityIndicator size="large" color="#0a7ea4" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0a7ea4",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
