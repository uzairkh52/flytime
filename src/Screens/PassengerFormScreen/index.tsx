import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Text,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import PhoneInput from "react-native-phone-number-input";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getPassPofile, NationalitData, passengerCaptain, PassengerFormFlight, setCaptainParams } from "../../store/slices/passengerFlightSlice";
import { mainStyle } from "../../assets/styles/component/mainStyle";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// ----------------------
// Navigation types
// ----------------------
type RootStackParamList = {
  PassengerFormScreen: undefined;
};

type PassengerFormScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PassengerFormScreen"
>;

// ----------------------
// Main Component
// ----------------------
const PassengerFormScreen = () => {
  const navigation = useNavigation<PassengerFormScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    countries = [],
    SelectPassenger,
    passProfile,
    selectedProfilePass,
    captainSuccess,
    ViewPassengers,
    PassFormData,
  } = useSelector((state: RootState) => state.passengerFlight);

  const cartType = useSelector((state: RootState) => state.booking.cartType);

  const [gender, setGender] = useState("");
  const [given_name, setFirstName] = useState("");
  const [family_name, setLastName] = useState("");
  const [born_on, setDob] = useState<Date | null>(null);
  const [passport_number, setPassportNumber] = useState("");
  const [passport_expire_date, setPassportExpiry] = useState<Date | null>(null);
  const [nationality, setNationality] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<any>({});

  const [showDob, setShowDob] = useState(false);
  const [showExpiry, setShowExpiry] = useState(false);
  const [minDate, setMinDate] = useState<any>(null);
  const [maxDate, setMaxDate] = useState<any>(null);

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const passengerType = SelectPassenger?.type || "adult";
  const PassengerAge = SelectPassenger?.age;
  const today = dayjs();

  const filteredCountries = countries.filter((c: any) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  // ----------------------
  // DOB Rules
  // ----------------------
  const applyDOBRules = () => {
    if (passengerType === "adult") {
      setMinDate(dayjs("1930-01-01"));
      setMaxDate(today.subtract(18, "year"));
    } else if (passengerType === "child") {
      setMaxDate(today.subtract(PassengerAge ?? 2, "year"));
      setMinDate(today.subtract((PassengerAge ?? 2) + 1, "year").add(1, "day"));
    } else if (passengerType === "infant" || passengerType === "infant_without_seat") {
      setMaxDate(today.subtract(PassengerAge ?? 0, "year"));
      setMinDate(today.subtract((PassengerAge ?? 0) + 1, "year").add(1, "day"));
    }
  };

  useEffect(() => {
    if (!SelectPassenger) return;
    applyDOBRules();
  }, [SelectPassenger]);

  // ----------------------
  // Prefill Passenger Data
  // ----------------------
  useEffect(() => {
    const uuid = selectedProfilePass?.uuid || SelectPassenger?.uuid;
    if (!uuid || !passProfile?.length) return;

    const p = passProfile.find((x: any) => x.uuid === uuid);
    if (!p) return;

    setGender(p.gender || "");
    setFirstName(p.given_name || "");
    setLastName(p.family_name || "");
    setDob(p.born_on ? new Date(p.born_on) : null);
    setPassportNumber(p.passport_number || "");
    setPassportExpiry(p.passport_expire_date ? new Date(p.passport_expire_date) : null);
    setPhone(p.phone_number || "");
    setEmail(p.email || "");

    const matchedCountry = countries.find(
      (c: any) => c.id === p.nationality?.id || c.code === p.nationality?.code
    );
    setNationality(matchedCountry || null);
  }, [passProfile, selectedProfilePass, SelectPassenger, countries]);

  // ----------------------
  // Fetch countries
  // ----------------------
  useEffect(() => {
    dispatch(NationalitData());
  }, [dispatch]);

  // ----------------------
  // Save Passenger
  // ----------------------
  const validatePassenger = (data: any) => {
    const errors: any = {};
    const nameRegex = /^[A-Za-z\s'-]+$/;
    const passportRegex = /^[A-Za-z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.gender) errors.gender = "Gender is required.";
    if (!data.given_name?.trim()) errors.given_name = "First name required.";
    else if (!nameRegex.test(data.given_name)) errors.given_name = "Invalid first name.";
    if (!data.family_name?.trim()) errors.family_name = "Last name required.";
    else if (!nameRegex.test(data.family_name)) errors.family_name = "Invalid last name.";
    if (!data.born_on) errors.born_on = "Date of birth required.";

    if (cartType === "flight" || cartType === "all") {
      if (!data.passport_number?.trim()) errors.passport_number = "Passport number required.";
      else if (!passportRegex.test(data.passport_number))
        errors.passport_number = "Invalid passport number.";
      if (!data.passport_expire_date) errors.passport_expire_date = "Passport expiry required.";
      if (!data.nationality) errors.nationality = "Nationality required.";
    }

    if (passengerType === "adult") {
      if (!data.email?.trim()) errors.email = "Email is required.";
      else if (!emailRegex.test(data.email)) errors.email = "Invalid email format.";
      if (!data.phone?.trim()) errors.phone = "Phone number required.";
    }

    return errors;
  };

  const handleSave = () => {
    const params = {
      gender,
      given_name,
      family_name,
      born_on: born_on ? dayjs(born_on).format("YYYY-MM-DD") : null,
      passport_number,
      passport_expire_date: passport_expire_date ? dayjs(passport_expire_date).format("YYYY-MM-DD") : null,
      nationality: nationality?.id,
      region: nationality?.code,
      email,
      phone_number: phone,
    };

    const validation = validatePassenger({
      gender,
      given_name,
      family_name,
      born_on,
      passport_number,
      passport_expire_date,
      nationality,
      email,
      phone,
    });

    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const isFirstPassenger = ViewPassengers?.[0]?.uuid === SelectPassenger?.uuid;

    if (isFirstPassenger) {
      dispatch(setCaptainParams(params));
    }

    if (cartType === "all" || cartType === "flight") {
      dispatch(PassengerFormFlight(params));
    }
  };

  useEffect(() => {
    if (captainSuccess || PassFormData) {
      navigation.goBack();
      if (PassFormData) Alert.alert("Passenger saved successfully");
    }
  }, [captainSuccess, PassFormData]);

  // ----------------------
  // Render
  // ----------------------
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={styles.title}>Passenger Details</Text>

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity style={styles.radioContainer} onPress={() => setGender("m")}>
          <View style={[styles.radio, gender === "m" && styles.radioSelected]} />
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioContainer} onPress={() => setGender("f")}>
          <View style={[styles.radio, gender === "f" && styles.radioSelected]} />
          <Text>Female</Text>
        </TouchableOpacity>
      </View>
      {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

      {/* First Name */}
      <TextInput
        placeholder="First Name"
        value={given_name}
        onChangeText={setFirstName}
        style={[styles.input, errors.given_name && styles.inputError]}
      />
      {errors.given_name && <Text style={styles.error}>{errors.given_name}</Text>}

      {/* Last Name */}
      <TextInput
        placeholder="Last Name"
        value={family_name}
        onChangeText={setLastName}
        style={[styles.input, errors.family_name && styles.inputError]}
      />
      {errors.family_name && <Text style={styles.error}>{errors.family_name}</Text>}

      {/* DOB */}
      <TouchableOpacity style={styles.button} onPress={() => setShowDob(true)}>
        <Text>{born_on ? dayjs(born_on).format("DD MMM YYYY") : "Select Date of Birth"}</Text>
      </TouchableOpacity>
      {errors.born_on && <Text style={styles.error}>{errors.born_on}</Text>}
      {/* {showDob && (
        <DateTimePicker
          value={born_on || (maxDate ? maxDate.toDate() : new Date())}
          mode="date"
          maximumDate={maxDate?.toDate()}
          minimumDate={minDate?.toDate()}
          onChange={(event, date) => {
            setShowDob(false);
            if (date) setDob(date);
          }}
        />
      )} */}

      {/* Passport */}
      <TextInput
        placeholder="Passport Number"
        value={passport_number}
        onChangeText={setPassportNumber}
        style={[styles.input, errors.passport_number && styles.inputError]}
      />
      {errors.passport_number && <Text style={styles.error}>{errors.passport_number}</Text>}

      <TouchableOpacity style={styles.button} onPress={() => setShowExpiry(true)}>
        <Text>{passport_expire_date ? dayjs(passport_expire_date).format("DD MMM YYYY") : "Select Passport Expiry"}</Text>
      </TouchableOpacity>
      {errors.passport_expire_date && <Text style={styles.error}>{errors.passport_expire_date}</Text>}
      {/* {showExpiry && (
        <DateTimePicker
          value={passport_expire_date || new Date()}
          mode="date"
          minimumDate={new Date()}
          onChange={(event, date) => {
            setShowExpiry(false);
            if (date) setPassportExpiry(date);
          }}
        />
      )} */}

      {/* Nationality */}
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Nationality</Text>
        <TextInput
          placeholder="Select Nationality"
          value={nationality?.name || query}
          onFocus={() => setShowDropdown(true)}
          onChangeText={(text) => {
            setQuery(text);
            setShowDropdown(true);
          }}
          style={[styles.input, errors.nationality && styles.inputError]}
        />
        {showDropdown && filteredCountries.length > 0 && (
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.id || item.code}
            style={styles.dropdown}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setNationality(item);
                  setQuery(item.name);
                  setShowDropdown(false);
                }}
                style={styles.dropdownItem}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        {errors.nationality && <Text style={styles.error}>{errors.nationality}</Text>}
      </View>

      {/* Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, errors.email && styles.inputError]}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* Phone */}
      <PhoneInput
        defaultValue={phone}
        defaultCode="US"
        layout="first"
        onChangeFormattedText={setPhone}
        containerStyle={{ marginTop: 15 }}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      {/* Buttons */}
      <View style={[mainStyle.displayFlex, mainStyle.flexRow, mainStyle.justifyContentEnd, { marginTop: 30 }]}>
        <TouchableOpacity style={[mainStyle.Btn, mainStyle.BtnPrimary, mainStyle.BtnX, mainStyle.Btnsm]} onPress={handleSave}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Save Passenger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
          <Text style={{ color: "#555" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 20, marginBottom: 20 },
  label: { marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 15,
  },
  inputError: { borderColor: "red" },
  error: { color: "red", marginTop: 4 },
  button: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginTop: 15,
    alignItems: "center",
  },
  radioContainer: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: "#333", marginRight: 6 },
  radioSelected: { backgroundColor: "#333" },
  dropdown: { maxHeight: 150, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginTop: 2 },
  dropdownItem: { padding: 10 },
});

export default PassengerFormScreen;
