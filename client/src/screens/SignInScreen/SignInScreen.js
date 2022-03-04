import React, { useState } from 'react';
// import { TextField, Button, Text, Card } from 'react-native-ui-lib';
import { Text, TextField, Button } from 'react-native-ui-lib';
// import TextField from 'react-native-ui-lib/textField';
// import Card from 'react-native-ui-lib/card';
import { View } from 'react-native';

import useAuth from '../../hooks/useAuth';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();

  return (
    // <ScrollView>
    <View>
      <TextField
        placeholder="email"
        autoCapitalize="none"
        value={email}
        onChangeText={(nextVal) => setEmail(nextVal)}
      />
      <TextField
        placeholder="password"
        autoCapitalize="none"
        value={password}
        onChangeText={(nextVal) => setPassword(nextVal)}
        secureTextEntry={true}
      />
      <Button label="Sign in" onPress={() => logIn(email, password)}></Button>
      <Text onPress={() => navigation.navigate('register')}>New to BruinEats? Register here </Text>
    </View>
  );
};

// const styles = StyleSheet.create({
//   root: {
//     alignItems: 'center',
//     padding: 10,
//     width: '100%',
//     height: '100%',
//     // justifyContent: 'center',
//   },
// });

export default SignInScreen;
