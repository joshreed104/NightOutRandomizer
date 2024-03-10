import * as React from 'react';
import {
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { addPlaceToDiary, fetchSavedPlaces } from '../placeNetwork';
import PlaceItem from '../PlaceItem';

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
    const places = await fetchSavedPlaces();
    setSavedPlaces(places.places);
  };

  const handleAdd = async (): Promise<void> => {
    let addedPlace: DiaryEntry | undefined;
    try {
      addedPlace = await addPlaceToDiary({
        name: 'test name',
        rating: 3.5,
        neighborhood: 'Ballard',
        user_rating: 5,
      });
    } catch (error) {
      console.log('error posting: ', error);
    }
    addedPlace && setSavedPlaces([...savedPlaces, addedPlace]);
  };

  const placesToDisplay = React.useMemo(() => {
    const placesItemsArray: React.ReactElement[] = [];
    savedPlaces.forEach((place) => {
      placesItemsArray.push(
        <View style={styles.placeContainer}>
          <PlaceItem key={place._id} place={place} showAddButton={false} />
        </View>
      );
    });
    return placesItemsArray;
  }, [savedPlaces]);

  return (
    <SafeAreaView>
      <Text>Hello from the Diary Screen</Text>
      <Button title='Fetch saved places' onPress={handleFetch} />
      <Button title='Post restaurant' onPress={handleAdd} />
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
