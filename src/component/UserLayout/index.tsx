import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "./../../assets/styles/SignUpStyles";
import { mainStyle } from "../../assets/styles/component/mainStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import HeaderUser from "../Layout/Header/HeaderUser";
import ThreadWatcher from "../../utils/HeaderUtils";

interface UserLayoutProps {
  navigation: any;
  username?: string;
  setUsername?: any;
  password?: string;
  setPassword?: any;
  firstName?: string;
  setFirstName?: any;
  lastName?: string;
  setLastName?: any;
  submit: any;
  isFormValid?: any;
  isLoading?: boolean;
  emailError?: string;
  passwordError?: string;
  firstNameError?: string;
  lastNameError?: string;
  formType: "Login" | "SignUp";
  LoginError?: any;
  SignUpError?: any;
}

const UserLayout: React.FC<UserLayoutProps> = ({
  navigation,
  formType,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  password,
  setPassword,
  submit,
  isFormValid,
  isLoading,
  emailError,
  passwordError,
  firstNameError,
  lastNameError,
  LoginError,
  SignUpError,
}) => {
  
  
  return (
    <>
    <ThreadWatcher />
    <SafeAreaView style={[mainStyle.Basecolor1Bg, styles.main]}>
      <ScrollView
        
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[mainStyle.container, styles.Header]}>
          <Text style={[mainStyle.h1, mainStyle.white]}>
            {formType === "Login" ? "Welcome Back!" : "Create an Account"}
          </Text>
          <Text style={[mainStyle.p, mainStyle.white]}>
            {formType === "Login"
              ? "Log in to continue your personalized travel journey and access your itineraries and recommendations anytime."
              : "Sign up to start your personalized travel journey and access your itineraries and recommendations anytime."}
          </Text>
        </View>

        {/* Form */}
        <View style={[mainStyle.container, styles.Body]}>
          {formType === "SignUp" && (
            <>
              {/* First Name */}
              <View style={mainStyle.formGroup}>
                <TextInput
                  style={mainStyle.formControl}
                  placeholder="Enter First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                {firstNameError && <Text style={styles.error}>{firstNameError}</Text>}
              </View>

              {/* Last Name */}
              <View style={mainStyle.formGroup}>
                <TextInput
                  style={mainStyle.formControl}
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                />
                {lastNameError && <Text style={styles.error}>{lastNameError}</Text>}
              </View>
            </>
          )}

          {/* Email */}
          <View style={mainStyle.formGroup}>
            <TextInput
              style={mainStyle.formControl}
              placeholder="Enter Email"
              keyboardType="email-address"
              value={username}
              onChangeText={setUsername}
            />
            {emailError && <Text style={styles.error}>{emailError}</Text>}
          </View>

          {/* Password */}
          <View style={mainStyle.formGroup}>
            <TextInput
              style={mainStyle.formControl}
              placeholder="Enter Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {passwordError && <Text style={styles.error}>{passwordError}</Text>}
          </View>

          {/* Error */}
          <Text style={styles.error}>{LoginError?.other || SignUpError?.other}</Text>

          {/* Submit */}
          <TouchableOpacity
            // disabled={!isFormValid || isLoading}
            onPress={submit}
            style={[mainStyle.Btn, mainStyle.BtnPrimary, mainStyle.Btnlg]}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={mainStyle.BtnPrimaryText}>
                {formType === "Login" ? "Login" : "Continue"}
              </Text>
            )}
          </TouchableOpacity>

          {/* Navigate */}
          <View style={mainStyle.py10}>
            {formType === "Login" ? (
              <Text>
                Don't have an account?{" "}
                <Text
                  style={mainStyle.Basecolor1}
                  onPress={() => navigation.navigate("SignUpScreen")}
                >
                  Sign Up
                </Text>
              </Text>
            ) : (
              <Text>
                Already have an account?{" "}
                <Text
                  style={mainStyle.Basecolor1}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  Log in
                </Text>
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default UserLayout;
