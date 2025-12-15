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
import LoginScreen from "../../../../Screens/Auth/LoginScreen";
import SplashScreen1 from "../../../../Screens/SplashScreen1";
import { headerStyle } from "../../../../assets/styles/component/HeaderStyle";
import { mainStyle } from "../../../../assets/styles/component/mainStyle";

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

  const handleLogout = async () => {
    dispatch(Logout());
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      })
    }, 2000);    
  };

  

  const { loginState } = useSelector((state: RootState) => state.login);
  console.log("loginState_home", loginState);
  
    // useEffect(()=> {
    //     if (loginState === false) {
    //         Alert.alert("asas");
    //         navigation.reset({
    //             index:0,
    //             routes:[{ name: "LoginScreen"}],
    //         })
    //     }
    // }, [loginState]);
  return (
    <View style={headerStyle.container}>
      <HeaderUtils />
      
      {currentUser ? (
        <View style={headerStyle.userBox}>
          <View style={[headerStyle.Thumbnail, mainStyle.justifyContentCenter, mainStyle.alignItemsCenter]}>
            <Text style={mainStyle.Basecolor1}>
              {currentUser.first_name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={mainStyle.Basecolor}>
            {currentUser.last_name || ""}
          </Text>
          <TouchableOpacity onPress={handleLogout} style={headerStyle.logoutBtn}>
            <Text style={headerStyle.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={headerStyle.loginBox}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          
          <Text style={headerStyle.loginText}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderUser;