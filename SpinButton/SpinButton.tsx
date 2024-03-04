import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import googlePlacesFetch from '../GoogleAPIFetch';
import neighborhoodInfo, { NeighborhoodInfo } from '../NeighborhoodInfo';
import { Place } from '../RandomizerScreen/RandomizerScreen';

interface Props {
  setNearbyRestaurants: Dispatch<SetStateAction<never[]>>;
  setSpinResult: (chosenNeighborhood: NeighborhoodInfo) => void;
  nearbyRestaurants: Place[];
}

const SpinButton = ({
  setNearbyRestaurants,
  setSpinResult,
  nearbyRestaurants,
}: Props) => {
  const [buttonString, setButtonString] = useState('Spin!');
  const handleSpinButtonPress = async () => {
    const randomHood = Math.floor(Math.random() * 40);
    const chosenNeighborhood = neighborhoodInfo[randomHood];
    let restaurantSearchResults;

    try {
      restaurantSearchResults = await googlePlacesFetch(chosenNeighborhood);
    } catch (e) {
      console.error('Error fetching places: ', e);
    }

    setNearbyRestaurants(restaurantSearchResults || []);
    setSpinResult(chosenNeighborhood);
    setButtonString('Respin');
    return;
  };
  const handleReset = () => {
    setNearbyRestaurants([]);
    setSpinResult({ name: '', coords: [0, 0] });
    setButtonString('Spin!');
  };

  const state = useMemo(() => {
    return (
      <>
        <Pressable onPress={handleSpinButtonPress} style={styles.spinButton}>
          <Text style={styles.buttonText}>{buttonString}</Text>
        </Pressable>
        {nearbyRestaurants.length > 0 && (
          <Pressable onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.buttonText}>{'Reset'}</Text>
          </Pressable>
        )}
      </>
    );
  }, [nearbyRestaurants]);

  return <View style={styles.root}>{state}</View>;
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  spinButton: {
    flex: 1,
    maxHeight: 50,
    width: '50%',
    borderRadius: 100,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    flex: 1,
    maxHeight: 50,
    width: '50%',
    borderRadius: 100,
    backgroundColor: 'red',
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
