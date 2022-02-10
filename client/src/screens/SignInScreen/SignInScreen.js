import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
//TODO: CHANGE favicon.png TO BRUINEATS LOGO
import Logo from '../../../assets/favicon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import tw from 'tailwind-react-native-classnames';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSignInPressed = () => {
    console.warn('Sign In Pressed');
  };
  const onForgotPwPressed = () => {
    console.warn('Forgot Password Pressed');
  };
  const onSignUpPressed = () => {
    console.warn('Sign Up Pressed');
  };

  return (
    // <ScrollView>
    <View style={styles.root}>
      {/* TODO: define image style with tailwinCSS */}

      <CustomInput
        placeholder="username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput
        placeholder="password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <CustomButton
        onPress={onSignInPressed}
        text="Sign in"
        type="Primary"
        bgColor={'blue'}
      />
      <CustomButton
        onPress={onForgotPwPressed}
        text="forgot password?"
        type="Tertiary"
      />
      <CustomButton onPress={onSignUpPressed} text="Sign up" type="Tertiary" />
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 50,
    width: '100%',
    height: '60%',
  },
  // logo: {
  //   width: 40,
  //   height: 40,
  // },
});

export default SignInScreen;
