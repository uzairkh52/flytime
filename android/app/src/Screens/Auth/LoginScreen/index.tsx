import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { loginUser } from "../../../store/slices/loginSlice"; // your login slice
import { styles } from "../../../assets/styles/SignUpStyles";
import HeaderUser from "../../../component/Layout/Header/HeaderUser";


const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { emailError, passwordError, isLoading } = useSelector(
    (state: RootState) => state.login
  );

  const params = { username, password };

  const submit = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    console.log("Login params:", params);
    dispatch(loginUser(params));
  };

  const isFormValid = username && password;
  

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={username}
        onChangeText={setUsername}
      />
      {emailError !== "" && <Text style={styles.error}>{emailError}</Text>}

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError !== "" && <Text style={styles.error}>{passwordError}</Text>}

      {/* Submit Button */}
      <TouchableOpacity
        disabled={!isFormValid || isLoading}
        onPress={submit}
        style={[
          styles.button,
          { backgroundColor: isFormValid ? "#1565C0" : "#9BB9E0" },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Navigate to Signup */}
      <TouchableOpacity>
        <Text>
          Don't have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign Up
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

export default LoginScreen;
