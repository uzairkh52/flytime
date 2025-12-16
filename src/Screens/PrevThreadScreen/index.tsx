import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Animated, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import { fetchThread } from "../../store/slices/baseSlice";
import AnimatedHeader from "../../component/Layout/AnimatedHeader";
import { mainStyle } from "../../assets/styles/component/mainStyle";

const ThreadDrawer = () => {
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(fetchThread());
  }, [dispatch]);

  const { ThreadData, isloading } = useSelector((state) => state.base);

  /* ---------------- GROUP LABELS ---------------- */
  const groupLabels = {
    today: "Today",
    yesterday: "Yesterday",
    last7Days: "Previous 7 Days",
    last30Days: "Previous 30 Days",
    lastMonth: "Previous Month",
    older: "Older",
  };

  /* ---------------- DATE GROUPING ---------------- */
  const groupRecordsByDate = (data) => {
    const sortedData = [...data].sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );

    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    const startOf7DaysAgo = new Date(startOfToday);
    startOf7DaysAgo.setDate(startOfToday.getDate() - 7);

    const startOf30DaysAgo = new Date(startOfToday);
    startOf30DaysAgo.setDate(startOfToday.getDate() - 30);

    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    const group = {
      today: [],
      yesterday: [],
      last7Days: [],
      last30Days: [],
      lastMonth: [],
      older: [],
    };

    sortedData.forEach((item) => {
      const itemDate = new Date(item.created_date);
      const localDate = new Date(
        itemDate.getTime() + itemDate.getTimezoneOffset() * 60000
      );
      const itemDay = new Date(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate()
      );

      if (itemDay.getTime() === startOfToday.getTime()) {
        group.today.push(item);
      } else if (itemDay.getTime() === startOfYesterday.getTime()) {
        group.yesterday.push(item);
      } else if (itemDay >= startOf7DaysAgo) {
        group.last7Days.push(item);
      } else if (itemDay >= startOf30DaysAgo) {
        group.last30Days.push(item);
      } else if (
        itemDay.getMonth() === lastMonth.getMonth() &&
        itemDay.getFullYear() === lastMonth.getFullYear()
      ) {
        group.lastMonth.push(item);
      } else {
        group.older.push(item);
      }
    });

    return group;
  };

  const groupedRecords = groupRecordsByDate(ThreadData || []);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  /* ---------------- UI ---------------- */
  return (
    <>
      <AnimatedHeader scrollY={scrollY} />

      <ScrollView
        style={[mainStyle.mainBody, mainStyle.container]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
          <Text style={{ fontWeight: "700", fontSize: 16 }}>Threads</Text>
        </View>

        {isloading ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : ThreadData?.length === 0 ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <Text>You don’t have any threads yet.</Text>
          </View>
        ) : (
          Object.keys(groupedRecords).map((key) => {
            const items = groupedRecords[key];
            if (items.length === 0) return null;

            return (
              <View key={key} style={{ marginBottom: 16 }}>
                {/* Group Title */}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}
                >
                  {groupLabels[key]}
                </Text>

                {/* Thread Cards */}
                {items.map((item) => (
                  <TouchableOpacity
                    key={item.uuid}
                    style={{
                      marginHorizontal: 16,
                      marginVertical: 4,
                      padding: 12,
                      borderRadius: 8,
                      backgroundColor: "#fff",
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                    onPress={() => console.log("Thread UUID:", item.uuid)}
                  >
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>
                      {item.title || "No Title"}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#555" }}>
                      {formatDate(item.created_date)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })
        )}
      </ScrollView>
    </>
  );
};

export default ThreadDrawer;
