import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

const CustomInput = ({ text, setText, placeholder, secureTextEntry }) => {
  return (
    //TODO: ADD Style to VIEW style={[tw`bg-white w-1/2`]}
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={setText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    padding: 8,
    justifyContent: 'center',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 25
  },
});

export default CustomInput;
