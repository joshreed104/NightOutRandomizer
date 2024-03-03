import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Randomizer from './RandomizerScreen';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Randomizer />
          <StatusBar style='auto' />
        </View>
      </SafeAreaView>
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
