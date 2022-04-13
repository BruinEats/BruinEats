import { View, Text, Image, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
//TODO: CHANGE favicon.png TO BRUINEATS LOGO
import Logo from '../../../assets/favicon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import tw from 'tailwind-react-native-classnames';
import { Input } from '@ui-kitten/components';

import useAuth from '../../hooks/useAuth';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [passwordR, setPasswordR] = useState('');
  const { register } = useAuth();

  const onTermOfUsePressed = () => {
    console.warn('Term of Use Pressed');
  };
  const onPrivacyPolicyPressed = () => {
    console.warn('Privacy Policy Pressed');
  };

  const showAlert = (description, status) => {
    Alert.alert(
      status,
      description,
      [
        {
          text: 'ok',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleRegister = async (email, username, password) => {
    const [text, type] = await register(email, username, password);
    showAlert(text, type);
  };

  return (
    // <ScrollView>
    <View style={styles.root}>
      {/* TODO: define image style with tailwinCSS */}
      <Text style={tw`text-3xl font-bold text-left text-blue-900`}>Create New Account</Text>
      <Input
        placeholder="email"
        autoCapitalize="none"
        value={email}
        onChangeText={(nextVal) => setEmail(nextVal)}
      />
      <Input
        placeholder="username"
        autoCapitalize="none"
        value={username}
        onChangeText={(nextVal) => setUsername(nextVal)}
      />
      <Input
        placeholder="password"
        autoCapitalize="none"
        value={password}
        onChangeText={(nextVal) => setPassword(nextVal)}
        secureTextEntry={true}
      />
      {/* <Input
        placeholder="repeat your password"
        value={passwordR}
        setValue={setPasswordR}
        secureTextEntry={true}
      /> */}
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

      <CustomButton
        onPress={() => handleRegister(email, username, password)}
        text="Sign up"
        type="Primary"
        bgColor={'blue'}
      />
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
    padding: 10,
    width: '100%',
    height: '60%',
  },
  // logo: {
  //   width: 40,
  //   height: 40,
  // },
});

export default SignUpScreen;
