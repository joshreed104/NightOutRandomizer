import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiaryEntry } from '../DiaryScreen/DiaryScreen';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

export const storePlaceInStorage = async (place: DiaryEntry) => {
  try {
    await AsyncStorage.setItem(place.name, JSON.stringify(place));
    console.log('saved in storage');
  } catch (error) {
    console.error('Error saving to AsyncStorage: ', error);
  }
};

export const getPlaceFromStorage = async (name: string) => {
  try {
    const place = await AsyncStorage.getItem(name);
    if (place !== null) {
      return JSON.parse(place);
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error getting item: ', error);
  }
};

export const getAllInStorage = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const storageValues = await AsyncStorage.multiGet(allKeys);
    return parsePlacesFromStorage(storageValues);
  } catch (error) {
    console.error('Error getting items: ', error);
  }
};

const parsePlacesFromStorage = (placesArray: readonly KeyValuePair[]) => {
  return placesArray.map((place) => {
    if (place[1]) {
      return JSON.parse(place[1]);
    }
  });
};
