import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const days = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
].map(m => ({ label: m, value: m }));
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  .map(y => ({ label: `${y}`, value: y }));

const CreateAccountScreen: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const [openDay, setOpenDay] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  const handleCreateAccount = async () => {
    if (!fullName || !email || !day || !month || !year || !username || !password) {
      return alert('Please fill all required fields');
    }
    try {
      const userData = { fullName, email, phone, dob: `${day}-${month}-${year}`, username, password };
      await AsyncStorage.setItem(username, JSON.stringify(userData));
      alert('Account created!');
      navigation.goBack();
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.overlay} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>◀ Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone (optional)"
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="white"
          />

          <Text style={styles.dobLabel}>Date of Birth</Text>
          <View style={styles.dobContainer}>
            <DropDownPicker
              open={openDay}
              setOpen={setOpenDay}
              value={day}
              setValue={setDay}
              items={days}
              placeholder="Day"
              containerStyle={{ flex: 1, marginRight: 5 }}
              style={{ backgroundColor: 'black', borderColor: 'white' }}
              textStyle={{ color: 'white' }}
              dropDownContainerStyle={{ backgroundColor: 'black' }}
            />
            <DropDownPicker
              open={openMonth}
              setOpen={setOpenMonth}
              value={month}
              setValue={setMonth}
              items={months}
              placeholder="Month"
              containerStyle={{ flex: 1, marginHorizontal: 5 }}
              style={{ backgroundColor: 'black', borderColor: 'white' }}
              textStyle={{ color: 'white' }}
              dropDownContainerStyle={{ backgroundColor: 'black' }}
            />
            <DropDownPicker
              open={openYear}
              setOpen={setOpenYear}
              value={year}
              setValue={setYear}
              items={years}
              placeholder="Year"
              containerStyle={{ flex: 1, marginLeft: 5 }}
              style={{ backgroundColor: 'black', borderColor: 'white' }}
              textStyle={{ color: 'white' }}
              dropDownContainerStyle={{ backgroundColor: 'black' }}
            />
          </View>

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

          <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
            <Text style={styles.createButtonText}>Create Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlay: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  backButton: { alignSelf: 'flex-start', marginBottom: 20 },
  backText: { color: 'white', fontSize: 16 },
  title: { fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: 'white',
  },
  dobLabel: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  dobContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
