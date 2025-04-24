import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email && password) {
      // Replace with actual auth logic
      Alert.alert('Login successful!');
      router.push('/(tabs)');
    } else {
      Alert.alert('Please enter email and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity onPress={() => Alert.alert('Forgot password?')} style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/LandingScreen')}>
          <Text style={styles.signupText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 30,
      justifyContent: 'center',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
      color: '#666',
    },
    input: {
      backgroundColor: '#f0f0f0',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      fontSize: 16,
    },
    forgot: {
      alignSelf: 'flex-end',
      marginBottom: 30,
    },
    forgotText: {
      color: '#0a7ea4',
      fontWeight: '500',
    },
    button: {
      backgroundColor: '#0a7ea4',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    signupText: {
      color: '#0a7ea4',
      fontWeight: '500',
    },
  });
  