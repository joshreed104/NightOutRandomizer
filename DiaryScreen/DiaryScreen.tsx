import * as React from 'react';
import {
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { fetchSavedPlaces } from '../placeNetwork';
import PlaceItem from '../PlaceItem';
import { getAllInStorage, getPlaceFromStorage } from '../utils/asyncStorage';

export interface DiaryEntry {
  _id?: string;
  name: string;
  rating: number;
  neighborhood: string;
  userRating?: number;
  placeUrl: string;
  photoUrl: string;
}

const DiaryScreen = (): React.ReactElement => {
  const [savedPlaces, setSavedPlaces] = React.useState([]);
  const handleFetch = async (): Promise<void> => {
    // const places = await fetchSavedPlaces();
    const places = await getAllInStorage();
    setSavedPlaces(places);
  };

  const placesToDisplay = React.useMemo(() => {
    const placesItemsArray: React.ReactElement[] = [];
    savedPlaces.forEach((place) => {
      placesItemsArray.push(
        <View style={styles.placeContainer}>
          <PlaceItem key={place.id} place={place} showAddButton={false} />
        </View>
      );
    });
    return placesItemsArray;
  }, [savedPlaces]);

  return (
    <SafeAreaView>
      <Text>Hello from the Diary Screen</Text>
      <Button title='Fetch saved places' onPress={handleFetch} />
      <ScrollView>{placesToDisplay}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  placeContainer: {
    padding: 30,
    borderWidth: 1,
  },
});
export default DiaryScreen;
