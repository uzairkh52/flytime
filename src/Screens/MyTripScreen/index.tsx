    import React, { useEffect, useRef, useState } from "react";
    import {
      View,
      Text,
      ScrollView,
      TouchableOpacity,
      FlatList,
      Image,
      ActivityIndicator,
      Alert,
      Animated,
    } from "react-native";
    import { useDispatch, useSelector } from "react-redux";

    // import { setisUserPopup } from "@/src/store/slices/Auth/SignupSlice";
    // import { deleteAndCreateThread } from "@/src/store/slices/sendMessageSlice";
    // import TripCard from "@/src/component/TripCard";
    // import Header from "@/src/component/layout/Header";
    import { AppDispatch, RootState } from "../../store/store";

    import { mainStyle } from "../../assets/styles/component/mainStyle";
    import TripCard from "../../component/MyTrip/TripCard";
    import { tripStyles } from "../../assets/styles/component/MyTripStyle";
    import { Button } from "react-native-paper";
    import { useNavigation } from "@react-navigation/native";
    import { MyTrip } from "../../store/slices/baseSlice";
    import AnimatedHeader from "../../component/Layout/AnimatedHeader";
import { variable } from "../../assets/styles/variable";


  const MyTripScreen = ({Screentype, handleMytrip}) => {
    console.log("type_000", Screentype);
    
    const dispatch = useDispatch<AppDispatch>();

    const [tabValue, setTabValue] = useState(0); // 0 = Upcoming, 1 = Past

    useEffect(() => {
      dispatch(MyTrip());
    }, [dispatch]);

    const TripData = useSelector((state: RootState) => state?.base?.TripData);
    const isLoading = useSelector((state: RootState) => state?.base?.isloading);
    console.log("trip_isLoading", isLoading);


    // const currentUser = useSelector((state:RootState) => state?.base?.currentUser?.user);

    const upcomingTrips = TripData?.upcoming_trips ?? [];
    const pastTrips = TripData?.past_trips ?? [];
    const selectedTrips = tabValue === 0 ? upcomingTrips : pastTrips;
    console.log("TripData_0222", pastTrips);

    // const HandlePopup = () => {
    //   dispatch(setisUserPopup(true));
    // };

    // const HandleBookThread = () => {
    //   dispatch(deleteAndCreateThread({ isMessage: "forBook" }));
    // };

    // useEffect(() => {
    //   if (!currentUser) {
    //     dispatch(setisUserPopup(true));
    //   } else if (currentUser) {
    //     dispatch(setisUserPopup(false));
    //     dispatch(MyTripSlice());
    //   }
    // }, [currentUser]);

    const renderTrip = ({ item }) => <TripCard tripData={item} />;

    const scrollY =  useRef(new Animated.Value(0)).current


    return (
      <View style={[
    { flex: 1 },
    Screentype !== "home" && mainStyle.container
  ]}>

      <AnimatedHeader scrollY={scrollY}>
        <View style={mainStyle.justifyContentBetween}>

        </View>
      </AnimatedHeader>
        <Animated.ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{paddingTop: variable.headerHEight + variable.containerPaddingTop}}
          keyboardShouldPersistTaps={"handled"}
          onScroll={Animated.event(
            [{ 
              nativeEvent: {contentOffset: {y: scrollY}}
            }],
            {useNativeDriver: false},
          )}
        >
          {/* Header */}
          <View style={[mainStyle.flexRow, mainStyle.justifyContentBetween, mainStyle.alignItemsCenter, mainStyle.py30]}>
            <View>
              {/* <Image
                source={require("@/src/assets/images/book-trip-icon.png")}
                style={tripStyles.headerIcon}
              /> */}
              <Text style={[mainStyle.h2, mainStyle.mb0]}>My Trips</Text>
            </View>
            <View>
              {Screentype == "home" ? (
                <TouchableOpacity onPress={handleMytrip} style={[mainStyle.BtnSmText, mainStyle.BtnBorderText]}><Text>View all Trips</Text></TouchableOpacity>
              ): (
              <TouchableOpacity
                style={[mainStyle.Btnborder, mainStyle.Btnsm]} mode="contained"
                onPress={"HandleBookThread"}
              >
                <Text style={[mainStyle.BtnSmText, mainStyle.BtnBorderText]}>Book a new trip</Text>
              </TouchableOpacity>
              )}
            </View>

          </View>

          {/* Tabs */}
          <View style={tripStyles.tabs}>
            <TouchableOpacity
              style={[tripStyles.tab, tabValue === 0 && tripStyles.activeTab]}
              onPress={() => setTabValue(0)}
            >

              <Text style={[tripStyles.tabText, tabValue === 0 && tripStyles.TabTextActive]}>Upcoming Trips</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[tripStyles.tab, tabValue === 1 && tripStyles.activeTab]}
              onPress={() => setTabValue(1)}
            >
              <Text style={[tripStyles.tabText, tabValue === 1 && tripStyles.TabTextActive]}>Past Trips</Text>
            </TouchableOpacity>
          </View>

          {/* Trip List */}
          {isLoading ? (
            <>
              <ActivityIndicator size="large" color={mainStyle.Basecolor1} style={{ marginTop: 20 }} />
            </>
          ) : selectedTrips.length > 0 ? (
            <>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
              >
                {selectedTrips.map((tripData, index) => (
                  <View key={index} style={{ marginRight: 16, width: 300 }}>
                    <TripCard tripData={tripData} />
                  </View>
                ))}
              </ScrollView>
            </>
          ) : (
            <Text style={tripStyles.noTripsText}>
              {tabValue === 0 ? "No upcoming trips found." : "No past trips found."}
            </Text>
          )}
        </Animated.ScrollView>
      </View>
    );
  };


  export default MyTripScreen;
