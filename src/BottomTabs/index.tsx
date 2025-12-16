import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../Screens/HomeScreen";
import { MyTrip } from "../store/slices/baseSlice";
import MyTripScreen from "../Screens/MyTripScreen";
import PrevThreadScreen from "../Screens/PrevThreadScreen";
import MyAccount from "../Screens/MyAccount";


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1539CF",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
        },
      }}
    >

      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyTripTab"
        component={MyTripScreen}
        options={{
          tabBarLabel: "My Trips",
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-list" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="OrdersTab"
        component={"OrdersStack"}
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-list" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={PrevThreadScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
