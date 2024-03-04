import { Place } from './RandomizerScreen/RandomizerScreen';

export interface PlacesFetchCache {
  neighborhood: Place[];
}

const placesFetchCache = {};
export default placesFetchCache;
