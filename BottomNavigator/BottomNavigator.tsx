import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RandomizerScreen from '../RandomizerScreen';
import DiaryScreen from '../DiaryScreen';
import NavigatorBar from './NavigatorBar';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Randomizer'
      backBehavior='history'
      // tabBar={(props) => <NavigatorBar {...props} />}
    >
      <Tab.Screen name='Randomizer' component={RandomizerScreen} />
      <Tab.Screen name='Diary' component={DiaryScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
