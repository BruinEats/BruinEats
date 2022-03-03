import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchInstance = async (url, method, token, body) => {
  console.log(url, method, token, body);
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authentication: token ? token : '',
    },
    body: body ? JSON.stringify(body) : '',
  };
  // options.body = JSON.stringify(body);
  console.log(options);

  return fetch(url, options);
};

export default fetchInstance;
