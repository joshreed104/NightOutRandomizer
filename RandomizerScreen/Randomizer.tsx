import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, ReactElement } from 'react';
import PlaceItem from '../PlaceItem';
import SpinButton from '../SpinButton';

export interface Place {
  name: string;
  rating: number;
  placeUrl: string;
  photoUrl: string;
}

export default function Randomizer(): ReactElement {
  const [spinResult, setSpinResult] = useState({
    name: "Let's pick a neighborhood",
  });
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.searchResults}
          horizontal={true}
        >
          <View style={styles.resultsContainer}>
            {nearbyRestaurants &&
              nearbyRestaurants.map((restaurant, i) => (
                <PlaceItem key={i} place={restaurant} />
              ))}
          </View>
        </ScrollView>
        <Text style={styles.neighborhood}>{spinResult.name}</Text>
        <SpinButton
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
    flexDirection: 'row',
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
