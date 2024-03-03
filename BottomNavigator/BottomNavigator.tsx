import * as React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { toTitleCase } from '../utils/toTitleCase';

const BottomNavigator = ({
  state,
  descriptors,
  navigation,
}: BottomTabNavigationProp) => {
  const generateTabButtons = (route, index: number) => {
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
        style={styles.buttonContainer}
        onPress={handleNavigation}
        key={`${route.name}Button`}
      >
        <Text>{nameToDisplay}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      {state.routes.map((route: Record<string, string>, index) =>
        generateTabButtons(route, index)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonContainer: {
    padding: 10,
    borderWidth: 1,
  },
});
export default BottomNavigator;
