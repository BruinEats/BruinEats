import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
//TODO: CHANGE favicon.png TO BRUINEATS LOGO
import Logo from '../../../assets/favicon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Input } from '@ui-kitten/components';
import { Alert } from 'react-native';

import useAuth from '../../hooks/useAuth';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();

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

  const handleLogin = async (email, password) => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    // const body = JSON.stringify({ email, password });
    // console.log(body);

    // console.log(`${rootUrl}/api/user/login`);
    // const res = await axios.post(`http://localhost:5000/api/user/login`, body, config);
    // console.log(res.data);

    const [text, type] = await logIn(email, password);
    showAlert(text, type);
  };

  return (
    // <ScrollView>
    <View style={styles.root}>
      <Input
        placeholder="email"
        autoCapitalize="none"
        value={email}
        onChangeText={(nextVal) => setEmail(nextVal)}
      />
      <Input
        placeholder="password"
        autoCapitalize="none"
        value={password}
        onChangeText={(nextVal) => setPassword(nextVal)}
        secureTextEntry={true}
      />
      <CustomButton
        onPress={() => handleLogin(email, password)}
        text="Sign in"
        type="Primary"
        bgColor={'blue'}
      />
      {/* <CustomButton
        onPress={onForgotPwPressed}
        text="forgot password?"
        type="Tertiary"
      /> */}
      <CustomButton
        text="Sign up"
        type="Tertiary"
        onPress={() => navigation.navigate('register')}
      />
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 10,
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
  },
  // logo: {
  //   width: 40,
  //   height: 40,
  // },
});

export default SignInScreen;
