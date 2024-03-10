import axios from 'axios';
import type { DiaryEntry } from '../DiaryScreen/DiaryScreen';

const baseUrl = 'http://localhost:8000';

export interface RemoteDiaryEntry {
  id: string;
  place_id: string;
  name: string;
  rating: number;
  neighborhood: string;
  place_url: string;
  photo_url: string;
  user_rating?: number;
}
export const addPlaceToDiary = async ({
  placeId,
  name,
  rating,
  neighborhood,
  placeUrl,
  photoUrl,
  userRating,
}: DiaryEntry): Promise<DiaryEntry | null> => {
  try {
    const response = await axios.post(`${baseUrl}/places`, {
      placeId,
      name,
      rating,
      neighborhood,
      place_url: placeUrl,
      photo_url: photoUrl,
      user_rating: userRating || null,
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
    return mapPlacesToDiaryModel(response.data);
  } catch (error) {
    console.log('Error fetching places: ', error);
  }
};

const mapPlacesToDiaryModel = (remotePlace: RemoteDiaryEntry): DiaryEntry => {
  const {
    id,
    place_id,
    name,
    rating,
    neighborhood,
    user_rating,
    place_url,
    photo_url,
  } = remotePlace;
  return {
    dbId: id,
    name,
    rating,
    neighborhood,
    userRating: user_rating,
    placeUrl: place_url,
    photoUrl: photo_url,
    placeId: place_id,
  };
};
