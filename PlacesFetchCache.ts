import { Place } from './Randomizer';

export interface PlacesFetchCache {
  neighborhood: Place[];
}

const placesFetchCache = {};
export default placesFetchCache;
