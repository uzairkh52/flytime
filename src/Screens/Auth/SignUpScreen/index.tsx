import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { SignUpUser, setFirstNameError, setLastNameError, setEmailError, setPasswordError } from "../../../store/slices/signupSlice"; 
import UserLayout from "../../../component/UserLayout";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { firstNameError, lastNameError, emailError, passwordError, isLoading, SignUpError } = useSelector(
    (state: RootState) => state.signup
  );
  console.log("signupError", firstNameError);
  
  
  const submit = () => {
    console.log("error_000");
    let hasError = false;
    
    // Reset errors
    dispatch(setFirstNameError(""));
    dispatch(setLastNameError(""));
    dispatch(setEmailError(""));
    dispatch(setPasswordError(""));

    // Validation
    if (!firstName) {
      dispatch(setFirstNameError("Please enter your first name"));
      hasError = true;
    }
    if (!lastName) {
      dispatch(setLastNameError("Please enter your last name"));
      hasError = true;
    }
    if (!email) {
      dispatch(setEmailError("Please enter your email"));
      hasError = true;
    }
    if (!password) {
      dispatch(setPasswordError("Please enter your password"));
      hasError = true;
    }

    if (hasError) return;

    // Dispatch signup action
    dispatch(SignUpUser({ first_name: firstName, last_name: lastName, email, password }));
  };

  const isFormValid = firstName && lastName && email && password;

  return (
    <UserLayout
      navigation={navigation}
      formType={"SignUp"}   // pass SignUp to show signup fields
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      username={email}
      setUsername={setEmail}
      password={password}
      setPassword={setPassword}
      submit={submit}
      isFormValid={isFormValid}
      isLoading={isLoading}
      firstNameError={firstNameError}
      lastNameError={lastNameError}
      emailError={emailError}
      passwordError={passwordError}
      SignUpError={SignUpError}
    />
  );
};

export default SignUpScreen;
