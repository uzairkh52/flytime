import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import { styles } from '../../../assets/styles/SignUpStyles';
import { SignUpUser } from '../../../store/slices/signupSlice';

const SignUpScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isuserLogin = useSelector(
    (state: any) => state?.login?.loginUser?.status === 200,
  );

  const {
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    isLoading,
  } = useSelector((state: RootState) => state.signup);

  const params = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  const submit = () => {
    Alert.alert('Notice', 'asas'); // Correct way to show alert
    console.log('params_00', params);
    dispatch(SignUpUser(params));
  };

  const isFormValid = firstName && lastName && email && password;

  useEffect(() => {
    if (isuserLogin) {
      navigation.navigate('Home');
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      {/* First Name */}
      <TextInput
        style={styles.input}
        placeholder="Enter First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      {firstNameError !== '' && (
        <Text style={styles.error}>{firstNameError}</Text>
      )}

      {/* Last Name */}
      <TextInput
        style={styles.input}
        placeholder="Enter Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      {lastNameError !== '' && (
        <Text style={styles.error}>{lastNameError}</Text>
      )}

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {emailError !== '' && <Text style={styles.error}>{emailError}</Text>}

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError !== '' && (
        <Text style={styles.error}>{passwordError}</Text>
      )}

      {/* Submit */}
      <TouchableOpacity
        disabled={!isFormValid || isLoading}
        onPress={submit}
        style={[
          styles.button,
          { backgroundColor: isFormValid ? '#1565C0' : '#9BB9E0' },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>

      {/* Already have account */}
      <TouchableOpacity>
        <Text>
          Already have an account?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.linkText}
          >
            Log in
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
