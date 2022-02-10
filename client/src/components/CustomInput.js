import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

const CustomInput = ({ text, setText, placeholder, secureTextEntry }) => {
  return (
    //TODO: ADD Style to VIEW style={[tw`bg-white w-1/2`]}
    <View classname={[tw`w-1/2`]} style={styles.container}>
      <TextInput
        classname={[tw`shadow border rounded w-full py-2 px-3 text-gray-700`]}
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

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;
