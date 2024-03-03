import * as React from 'react';
import { Button } from 'react-native';

const NavigatorBar = ({ state, descriptors, navigation }) => {
  console.log('----- state', state);
  return (
    <Button title={'Route button'} onPress={state.routeNames.Diary}></Button>
  );
};

export default NavigatorBar;
