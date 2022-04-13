import { ROOT_URL } from './params';

const fetchInstance = async (url, method, token, body) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      authentication: token ? token : '',
    },
    body: body ? JSON.stringify(body) : '',
  };

  return fetch(ROOT_URL + url, options);
};

export default fetchInstance;
