import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RandomizerScreen from './RandomizerScreen';
import DiaryScreen from './DiaryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='randomizer' backBehavior='history'>
        <Tab.Screen
          name='randomizer'
          options={{ title: 'Spin the wheel' }}
          component={RandomizerScreen}
        />
        <Tab.Screen
          name='diary'
          options={{ title: 'Diary' }}
          component={DiaryScreen}
        />
      </Tab.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
