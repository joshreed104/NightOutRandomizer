import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import type { ReactElement } from 'react';
import filledStar from '../assets/star-filled.png';
import unfilledStar from '../assets/star-unfilled.png';

export default function starRating(restaurantRating: number): ReactElement {
  const starRating = [];
  const filledNumber = Math.floor(restaurantRating);

  for (let i = 0; i < filledNumber; i++) {
    starRating.push(
      <Image key={i} source={filledStar} style={styles.stars}></Image>
    );
  }

  for (let i = filledNumber; i < 5; i++) {
    starRating.push(
      <Image key={i} source={unfilledStar} style={styles.stars}></Image>
    );
  }

  const starContainer = <View style={styles.starContainer}>{starRating}</View>;
  return starContainer;
}

const styles = StyleSheet.create({
  starContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 2,
  },
  stars: {
    padding: 1,
    height: 20,
    width: 20,
  },
});
