import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import logo from "../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";
import { ErrorToast, SuccessToast} from 'react-native-toast-message';
export default function Signup() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when submitting form
    try {
      const res = await axios.post(
        "https://vihaan007-xxnf.onrender.com/users/register",
        {
          userName,
          fullName,
          email,
          pin,
          phoneNo,
          password,
        }
      );
      SuccessToast({text1: 'Login successful!' });
      // Navigate to login screen
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false); // Reset loading regardless of success or error
    }
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('index')}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
        </TouchableOpacity>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userName}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="PIN"
          value={pin}
          onChangeText={(text) => setPin(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNo}
          onChangeText={(text) => setPhoneNo(text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
        <View style={styles.signInText}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  formContainer: {
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  signInText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signInLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
