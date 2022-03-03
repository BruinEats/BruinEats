import AsyncStorage from '@react-native-async-storage/async-storage';

import rootUrl from './rootUrl';
const fetchInstance = async (url, method, token, body) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token : '',
    },
    body: body ? JSON.stringify(body) : '',
  };
  // console.log(options);

  return fetch(rootUrl + url, options);
};

export default fetchInstance;
