import { Alert } from 'react-native';

const showAlert = (description) => {
  Alert.alert(
    'Error',
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

export default showAlert;
