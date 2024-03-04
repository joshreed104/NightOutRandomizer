import * as React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { toTitleCase } from '../utils/toTitleCase';

interface NavigationRoute {
  key: string;
  name: string;
  params: Record<string, string> | undefined;
}
const BottomNavigator = ({
  state,
  descriptors,
  navigation,
}: BottomTabNavigationProp) => {
  const generateTabButtons = (route: NavigationRoute, index: number) => {
    const nameToDisplay = toTitleCase(route.name);

    const isFocused = state.index === index;
    const handleNavigation = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigation}
        key={`${route.name}Button`}
      >
        <Text style={styles.buttonText}>{nameToDisplay}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      {state.routes.map((route: NavigationRoute, index: number) =>
        generateTabButtons(route, index)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});
export default BottomNavigator;
