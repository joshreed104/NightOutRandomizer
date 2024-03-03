import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import type { ReactElement } from 'react';
import filledStar from './assets/star-filled.png';
import unfilledStar from './assets/star-unfilled.png';

export default function starRating(restaurantRating: number): ReactElement {
  const starRating = [];
  // console.log('star rating function');
  const filledNumber = Math.floor(restaurantRating);
  let unfilledNumber = 5;
  for (let i = 0; i < filledNumber; i++) {
    unfilledNumber--;
    starRating.push(
      <Image key={'star' + i} source={filledStar} style={styles.stars}></Image>
    );
    if (i === filledNumber - 1) {
      while (unfilledNumber !== 0) {
        starRating.push(
          <Image
            key={'unfilled' + unfilledNumber}
            source={unfilledStar}
            style={styles.stars}
          ></Image>
        );
        unfilledNumber--;
      }
    }
  }

  // console.log('star rating function');
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
