import { ROOT_URL } from '@env';

const fetchInstance = async (url, method, token, body) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      authentication: token ? token : '',
    },
    body: body ? JSON.stringify(body) : '',
  };
  // console.log(options);

  return fetch(ROOT_URL + url, options);
};

export default fetchInstance;
