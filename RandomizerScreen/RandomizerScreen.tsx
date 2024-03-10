import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, ReactElement } from 'react';
import PlaceItem from '../PlaceItem';
import SpinButton from '../SpinButton';

export interface Place {
  placeId: string;
  name: string;
  rating: number;
  neighborhood: string;
  userRating?: number;
  placeUrl: string;
  photoUrl: string;
}

export default function Randomizer(): ReactElement {
  const [spinResult, setSpinResult] = useState({
    name: "Let's pick a neighborhood",
  });
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  const initialState = () => {
    return (
      <View style={styles.initialTextContainer}>
        <Text style={styles.initialText}>{"Let's pick a neighborhood!"}</Text>
      </View>
    );
  };

  const dataDisplay = (results: Place[]) => {
    return (
      <>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.searchResults}
          horizontal={true}
        >
          {results.map((result, i) => (
            <PlaceItem key={i} place={result} showAddButton={true} />
          ))}
        </ScrollView>
        <Text style={styles.neighborhoodName}>{spinResult.name}</Text>
      </>
    );
  };

  const currentState =
    nearbyRestaurants.length > 0
      ? dataDisplay(nearbyRestaurants)
      : initialState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.resultsContainer}>{currentState}</View>
        <SpinButton
          nearbyRestaurants={nearbyRestaurants}
          setNearbyRestaurants={setNearbyRestaurants}
          setSpinResult={setSpinResult}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  initialTextContainer: {
    justifyContent: 'center',
  },
  initialText: {
    fontSize: 36,
  },
  neighborhoodName: {
    fontSize: 36,
    textAlign: 'center',
  },
  neighborhood: {
    fontSize: 50,
    padding: 20,
  },
  scrollViewContainer: {},
  searchResults: {
    display: 'flex',
    maxHeight: '70%',
  },
  stars: {
    height: 30,
    width: 30,
  },
});
