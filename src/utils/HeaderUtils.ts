import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import HomeScreen from "../Screens/HomeScreen";
import ChatScreen from "../Screens/ChatScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import { setLoginState, setLoginUser } from "../store/slices/loginSlice";
import { setIsSignupUser } from "../store/slices/signupSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../store/store";

const ThreadWatcher = () => {
  const navigation = useNavigation();
  const threadUuid = useSelector((state: any) => state?.sendMessage?.threadUuid);

  console.log("get_threadUuid", threadUuid);
  
  const route = useRoute();
  const dispatch = useDispatch();


  const isuserLogin = useSelector(
    (state: RootState) => state?.login?.loginUser
  );
  const { loginState } = useSelector((state: RootState) => state?.login);
  
  console.log("Current_Screen:", route.name === "LoginScreen");
  console.log("isuserLogin2", loginState);

  useEffect(() => {
    const loadUser = async () => {
      const userString = await AsyncStorage.getItem("set-user");
      const access_token = await AsyncStorage.getItem("access_token");
      const refresh_token = await AsyncStorage.getItem("refresh_token");

      if (!userString) {
        await AsyncStorage.multiRemove([
          "set-user",
          "access_token",
          "refresh_token",
        ]);

        dispatch(setLoginState(false));
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

      dispatch(setLoginState(true));  //
    };

    loadUser();
  }, []);

  useEffect(() => {
  if (route.name === "LoginScreen" && loginState === true) {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainTabs",
          params: {
            screen: "HomeTab",
          },
        },
      ],
    });
  }
}, [loginState, route.name]);



  

  useEffect(() => {
    if (threadUuid) {
        navigation.navigate("ChatScreen", { threadUuid });
    }
  }, [threadUuid, navigation, dispatch]);

  return null; // Does not render anything
};

export default ThreadWatcher;
