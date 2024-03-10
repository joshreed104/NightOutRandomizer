import * as React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { toTitleCase } from '../utils/toTitleCase';
import Ionicons from '@expo/vector-icons/Ionicons';
import DiaryScreen from '../DiaryScreen';

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

    const ICON_NAME = React.useMemo(() => {
      switch (route.name) {
        case 'diary':
          return 'book-outline';
        case 'randomizer':
          return 'shuffle';
        case 'distribution':
          return 'stats-chart-outline';
        default:
          break;
      }
    }, [route.name]);

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
        <View style={styles.iconContainer}>
          <Ionicons name={ICON_NAME} size={32} />
        </View>
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
  iconContainer: {
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});
export default BottomNavigator;
