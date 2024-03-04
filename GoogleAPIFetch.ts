// @ts-expect-error typescript doesn't recognize @env
import { GOOGLE_API_KEY } from '@env';
import axios from 'axios';
import { NeighborhoodInfo } from './NeighborhoodInfo.js';
import { Place } from './RandomizerScreen/RandomizerScreen.js';

interface RawResult {
  name: string;
  rating: number;
  place_id: string;
  photos: [
    {
      photo_reference: string;
    }
  ];
}

const generatePhotoUrl = (photoRef: string) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxheight=10000&key=${GOOGLE_API_KEY}&photo_reference=${photoRef}`;
};

const mapResultToModel = (rawResults: RawResult): Place => {
  const mappedResult = {
    name: rawResults.name,
    rating: rawResults.rating,
    placeUrl: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${rawResults.place_id}`,
    photoUrl: generatePhotoUrl(rawResults?.photos[0].photo_reference),
  };
  return mappedResult;
};

export default async function googlePlacesFetch(
  neighborhood: NeighborhoodInfo
): Promise<Place[]> {
  let results;
  const chosenNeighborhood = neighborhood.name;

  // Fetch from the places API and map the response to the model in order of rating
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        params: {
          query: `restaurants in ${chosenNeighborhood} seattle`,
          radius: '3200',
          key: GOOGLE_API_KEY,
        },
      }
    );
    results = response.data.results.map((place: RawResult) =>
      mapResultToModel(place)
    );

    results.sort((a: Place, b: Place) => {
      return b.rating * 10 - a.rating * 10;
    });
  } catch (error) {
    console.log('Error searching places: ', error);
    throw error;
  }
  return results;
}
