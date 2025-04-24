import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LocationMap = ({ transport }) => {
  const transportationData = [
    {
      id: 1,
      type: "taxi",
      latitude: 35.78825 + 0.001,
      longitude: -0.4324 + 0.002,
    },
    {
      id: 2,
      type: "bus",
      latitude: 35.78825 - 0.002,
      longitude: -0.4324 + 0.001,
    },
    {
      id: 3,
      type: "tram",
      latitude: 35.78825 + 0.003,
      longitude: -0.4324 - 0.001,
    },
    {
      id: 4,
      type: "taxi",
      latitude: 36.78825 - 0.0015,
      longitude: -0.4324 + 0.003,
    },
  ];

  const [transportation, setTransportation] = useState(transportationData);
  const [selectedTransport, setSelectedTransport] = useState(null);

  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } catch (err) {
      setErrorMsg("Error getting location");
      console.error(err);
    }
  };

  const renderTransportMarkers = () => {
    if (!region) return null;

    return transportationData.map((vehicle) => (
      <Marker
        key={vehicle.id}
        coordinate={{
          latitude: vehicle.latitude,
          longitude: vehicle.longitude,
        }}
        title={vehicle.type.toUpperCase()}
        description={`Available ${vehicle.type}`}
      >
        <View style={styles.transportIcon}>
          <Text style={styles.vehicleEmoji}>
            {vehicle.type === "taxi"
              ? "🚖"
              : vehicle.type === "bus"
              ? "🚌"
              : "🚊"}
          </Text>
        </View>
      </Marker>
    ));
  };

  const handleRefresh = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        ...region,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (err) {
      console.error("Error refreshing location:", err);
    }
  };

  const zoomIn = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2,
      longitudeDelta: prev.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2,
    }));
  };

  const centerToCurrentLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationHeader}>
        <Icon name="map-marker" size={24} color="#0a7ea4" />
        <Text style={styles.locationText}>Your Location</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Icon name="refresh" size={24} color="#0a7ea4" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        {region ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            region={region}
            showsUserLocation={true}
            showsMyLocationButton={false}
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="Your Location"
              pinColor="#0a7ea4"
            />
            {renderTransportMarkers()}
          </MapView>
        ) : (
          <Text style={styles.mapPlaceholder}>
            {errorMsg || "Requesting location..."}
          </Text>
        )}

        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapControlButton} onPress={zoomIn}>
            <Icon name="plus" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mapControlButton, styles.mapControlButtonBottom]}
            onPress={zoomOut}
          >
            <Icon name="minus" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={centerToCurrentLocation}
        >
          <Icon name="crosshairs-gps" size={18} color="#0a7ea4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Keep your existing styles the same
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  refreshButton: {
    padding: 6,
  },
  mapContainer: {
    height: 380,
    backgroundColor: "#E8E8E8",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapPlaceholder: {
    color: "#9A9A9A",
    fontSize: 16,
  },
  mapControls: {
    position: "absolute",
    right: 12,
    bottom: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapControlButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  mapControlButtonBottom: {
    borderBottomWidth: 0,
  },
  currentLocationButton: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "#FFFFFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default LocationMap;
