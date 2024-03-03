import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import googlePlacesFetch from '../GoogleAPIFetch';
import neighborhoodInfo, { NeighborhoodInfo } from '../NeighborhoodInfo';
import { Place } from '../RandomizerScreen/Randomizer';

interface Props {
  setNearbyRestaurants: Dispatch<SetStateAction<never[]>>;
  setSpinResult: (chosenNeighborhood: NeighborhoodInfo) => void;
}

const SpinButton = ({ setNearbyRestaurants, setSpinResult }: Props) => {
  const handleSpinButtonPress = async () => {
    const randomHood = Math.floor(Math.random() * 41);
    const chosenNeighborhood = neighborhoodInfo[randomHood];
    let restaurantSearchResults;

    try {
      restaurantSearchResults = await googlePlacesFetch(chosenNeighborhood);
    } catch (e) {
      console.error('Error fetching places: ', e);
    }

    setNearbyRestaurants(restaurantSearchResults);
    setSpinResult(chosenNeighborhood);

    return;
  };

  return (
    <Pressable onPress={handleSpinButtonPress} style={styles.spinButton}>
      <Text style={styles.buttonText}>Spin!</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  spinButton: {
    flex: 1,
    maxHeight: 50,
    width: 200,
    borderRadius: 100,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    padding: 5,
    fontSize: 30,
  },
});
export default SpinButton;
