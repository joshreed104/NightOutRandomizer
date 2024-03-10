import axios from 'axios';
import { DiaryEntry } from '../PlaceItem/PlaceItem';

const baseUrl = 'http://localhost:8000';

export const addPlaceToDiary = async ({
  name,
  rating,
  neighborhood,
  placeUrl,
  photoUrl,
  user_rating,
}: DiaryEntry): Promise<DiaryEntry | null> => {
  try {
    const response = await axios.post(`${baseUrl}/places`, {
      name,
      rating,
      neighborhood,
      place_url: placeUrl,
      photo_url: photoUrl,
    });
    return response.data;
  } catch (error) {
    console.log('Error saving Place: ', error);
    return null;
  }
};

export const fetchSavedPlaces = async () => {
  try {
    const response = await axios.get(`${baseUrl}/places`);
    return response.data;
  } catch (error) {
    console.log('Error fetching places: ', error);
  }
};
