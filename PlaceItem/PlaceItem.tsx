import React from 'react';
import {
  Pressable,
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
} from 'react-native';
import type { Place } from '../Randomizer';
import starRating from '../StarRating';

interface Props {
  place: Place;
}
const PlaceItem = ({ place }: Props) => {
  const { name, placeUrl, photoUrl, rating } = place;
  const starDisplay = starRating(rating);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        Linking.openURL(placeUrl);
      }}
    >
      <View>
        <Image
          style={styles.photo}
          source={{
            uri: photoUrl,
          }}
        ></Image>
      </View>
      <Text style={styles.restaurantText}>
        {name}: {rating}
      </Text>
      {starDisplay}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  restaurantText: {
    fontSize: 16,
  },
  photo: {
    width: 200,
    height: 200,
  },
});

export default PlaceItem;
