import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  onLogin: () => void;
};

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const storedPassword = await AsyncStorage.getItem(username);
      if (storedPassword && storedPassword === password) {
        onLogin();
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/Loginbp.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="white"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="white"
        />
        <Button title="Login" onPress={handleLogin} color="white" />
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount' as never)}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' },
  overlay: { padding: 20, borderRadius: 10, alignItems: 'center', width: '80%' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  input: { width: '100%', height: 40, borderWidth: 1, borderColor: 'white', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10, color: 'white' },
  createAccountText: { color: 'white', marginTop: 10, textDecorationLine: 'underline' },
});
