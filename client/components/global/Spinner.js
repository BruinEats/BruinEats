import { View, Image } from 'react-native';

const Spinner = () => (
  <View>
    <Image
      src="https://raw.githubusercontent.com/bradtraversy/devconnector_2.0/master/client/src/components/layout/spinner.gif"
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </View>
);

export default Spinner;
