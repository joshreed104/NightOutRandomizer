import { Place } from './RandomizerScreen/Randomizer';

export interface PlacesFetchCache {
  neighborhood: Place[];
}

const placesFetchCache = {};
export default placesFetchCache;
