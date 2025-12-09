import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { loginUser, setEmailError, setPasswordError } from "../../../store/slices/loginSlice"; // your login slice
import { styles } from "../../../assets/styles/SignUpStyles";
import HeaderUser from "../../../component/Layout/Header/HeaderUser";
import { mainStyle } from "../../../assets/styles/component/mainStyle";
import UserLayout from "../../../component/UserLayout";
import { useNavigation } from "@react-navigation/native";




const LoginScreen = () => {
  const dispatch = useDispatch();



  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {LoginError, emailError, passwordError, isLoading} = useSelector(
    (state: RootState) => state?.login
  );
  const error  = useSelector(
    (state: RootState) => state?.login
  );
  console.log("loginError_000", isLoading);
  

  const navigation = useNavigation();

  const params = { username, password };

  const submit = () => {
    let hasError = false;

    // Reset old errors
    dispatch(setEmailError(""));
    dispatch(setPasswordError(""));

    // Email empty
    if (!username) {
      dispatch(setEmailError("Please enter your email"));
      hasError = true;
    }

    // Password empty
    if (!password) {
      dispatch(setPasswordError("Please enter your password"));
      hasError = true;
    }

    // If any field missing → stop here
    if (hasError) return;

    // Both fields are valid → call API
    dispatch(loginUser({ username, password }));
  };


  const isFormValid = username && password;


  return (
    <>
      <UserLayout
        navigation={navigation}   // ← add this
        formType="Login"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        submit={submit}
        isFormValid={isFormValid}
        isLoading={isLoading}
        emailError={emailError}
        passwordError={passwordError}
        LoginError={LoginError}
      />
    </>
  );
};

export default LoginScreen;
