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
import { styles } from "./../../assets/styles/SignUpStyles";
import { mainStyle } from "../../assets/styles/component/mainStyle";
import SignUpScreen from "../../Screens/Auth/SignUpScreen";


interface UserLayoutProps {
  navigation: any,      // ← add this
  username: any,
  setUsername: any,
  password: any,
  setPassword: any,
  submit: any,
  isFormValid: any,
  isLoading: any,
  emailError: any,
  passwordError: any,
  formType: any,
  LoginError: any,
}


const UserLayout: React.FC<UserLayoutProps> = ({
  navigation,
  formType,
  username,
  setUsername,
  password,
  setPassword,
  submit,
  isFormValid,
  emailError,
  passwordError,
  isLoading,
  LoginError
}) => {
    console.log("LoginError1111", formType);
    

  return (
    <>
      <SafeAreaView style={[ mainStyle.justifyContentStart, mainStyle.Basecolor1Bg, mainStyle.flex1]}>
        <View style={[mainStyle.container,, styles.Header]}>
          <Text style={[mainStyle.h1, mainStyle.white]} >Welcome Back!</Text>
          <Text style={mainStyle.p, mainStyle.white} >Log in to continue your personalized travel journey and access your itineraries and recommendations anytime.</Text>
        </View>
        <View style={[mainStyle.container, styles.Body, mainStyle.flex1]}>
            {formType ? (
             <>
                {/* Email */}
                <View style={[mainStyle.formGroup]}>
                    <TextInput
                        style={mainStyle.formControl}
                        placeholder="Enter Email"
                        keyboardType="email-address"
                        value={username}
                        onChangeText={setUsername}
                    />
                    {emailError !== "" && <Text style={styles.error}>{emailError}</Text>}

                </View>
                <View style={[mainStyle.formGroup]}>
                    {/* Password */}
                    <TextInput
                        style={mainStyle.formControl}
                        placeholder="Enter Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {passwordError !== "" && <Text style={styles.error}>{passwordError}</Text>}
                </View>
                
                <Text style={styles.error}>{LoginError?.other}</Text>
                {/* Submit Button */}
                <TouchableOpacity
                    disabled={!isFormValid || isLoading}
                    onPress={submit}
                    style={[mainStyle.Btn, mainStyle.BtnPrimary, mainStyle.Btnlg]}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={mainStyle.BtnPrimaryText}>Login</Text>
                    )}
                </TouchableOpacity>
                
                {/* Navigate to Signup */}
                <View style={[mainStyle.py10]}>
                    <Text>
                        Don't have an account?{" "}
                        <Text
                            style={mainStyle.Basecolor1}
                            onPress={() => navigation.navigate("SignUpScreen")}
                        >
                            Sign Up
                        </Text>
                    </Text>
                </View>
             </>   
            ): ""}
        </View>
      </SafeAreaView>
    </>
  );
};

export default UserLayout;
