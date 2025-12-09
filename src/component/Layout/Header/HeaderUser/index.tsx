import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Logout,
  setLoginUser,
  setLoginState,
} from "../../../../store/slices/loginSlice";


import { setIsSignupUser } from "../../../../store/slices/signupSlice";
import { RootState } from "../../../../store/store";
import HeaderUtils from "../../../../utils/HeaderUtils";
import { useNavigation } from "@react-navigation/native";

interface HeaderUserProps {
  navigation: any;
  
}

const HeaderUser: React.FC<HeaderUserProps> = ({  }) => {

  const navigation = useNavigation<any>();
   const dispatch = useDispatch();


  const loginUserState = useSelector(
    (state: RootState) => state.login.loginUser
  );

  const currentUser = loginUserState?.user;

  console.log("loginUserState2", loginUserState);
  

  // Load user from AsyncStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const userString = await AsyncStorage.getItem("set-user");
      const access_token = await AsyncStorage.getItem("access_token");
      const refresh_token = await AsyncStorage.getItem("refresh_token");
      console.log("userString", userString);
      
      

      if (!userString || !access_token || !refresh_token) {
        await AsyncStorage.multiRemove([
          "set-user",
          "access_token",
          "refresh_token",
        ]);
        return;
      }

      const user = JSON.parse(userString);
      dispatch(
        setIsSignupUser({
          user,
          access_token,
          refresh_token,
          status: 200,
        })
      );
      dispatch(
        setLoginUser({
          user,
          access_token,
          refresh_token,
          status: 200,
        })
      );
      dispatch(setLoginState(false));
    };

    loadUser();
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(Logout());
    Alert.alert("Logged out", "You have successfully logged out.");
  };

  const handleLoginPopup = () => {
   //  navigation.navigate("Login"); // Navigate to Login screen
    Alert.alert("asas")
  };

  return (
    <View style={styles.container}>
      <HeaderUtils />
      
      {currentUser ? (
        <View style={styles.userBox}>
          <Text style={styles.userName}>
            {currentUser.first_name.charAt(0).toUpperCase()}.{" "}
            {currentUser.last_name || ""}
          </Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.loginBox}
          onPress={() => navigation.navigate('Login')}
        >
          
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#f00",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
  },
  loginBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  userIcon: {
    width: 24,
    height: 24,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
