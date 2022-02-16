import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
//TODO: CHANGE favicon.png TO BRUINEATS LOGO
import Logo from '../../../assets/favicon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import tw from 'tailwind-react-native-classnames';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const onSignUpPressed = () => {
    console.warn('Sign Up Pressed');
  };
  const onSignInPressed = () => {
    console.warn('Sign In Pressed');
  };
  const onTermOfUsePressed = () => {
    console.warn('Term of Use Pressed');
  };
  const onPrivacyPolicyPressed = () => {
    console.warn('Privacy Policy Pressed');
  };

  return (
    // <ScrollView>
    <View style={styles.root}>
      {/* TODO: define image style with tailwinCSS */}
      <Text style={tw`text-3xl font-bold text-left text-blue-900`}>Create New Account</Text>
      <CustomInput placeholder="email" value={email} setValue={setEmail} />
      <CustomInput placeholder="username" value={username} setValue={setUsername} />
      <CustomInput
        placeholder="password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <CustomInput
        placeholder="repeat your password"
        value={passwordR}
        setValue={setPasswordR}
        secureTextEntry={true}
      />
      <Text style={tw`text-gray-400 my-2`}>
        By registering, you confirm that you accept our
        <Text style={tw`text-blue-400`} onPress={onTermOfUsePressed}>
          {' '}
          Term of Use{' '}
        </Text>
        and
        <Text style={tw`text-blue-400`} onPress={onPrivacyPolicyPressed}>
          {' '}
          Privacy Policy{' '}
        </Text>
      </Text>
      {/*
       */}

      <CustomButton onPress={onSignUpPressed} text="Sign up" type="Primary" bgColor={'blue'} />
      <CustomButton
        onPress={() => navigation.navigate('login')}
        text="Already have an account? Sign in"
        type="Tertiary"
        text_type="Tertiary"
      />
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: 'center',
    padding: 50,
    width: '100%',
    height: '60%',
  },
  // logo: {
  //   width: 40,
  //   height: 40,
  // },
});

export default SignUpScreen;
