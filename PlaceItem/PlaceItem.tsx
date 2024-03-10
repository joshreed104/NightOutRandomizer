import React from 'react';
import {
  Pressable,
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  Button,
} from 'react-native';
import type { Place } from '../RandomizerScreen/RandomizerScreen';
import StarRating from '../StarRating';
import { addPlaceToDiary } from '../placeNetwork';

interface Props {
  place: Place;
  showAddButton: boolean;
}

const PlaceItem = ({ place, showAddButton }: Props) => {
  // TODO: Make separate remote and local types, map properties to JS
  // style names after fetching (e.g. place_url to placeUrl)
  const { name, rating, neighborhood } = place;
  const photoUrl = place.photo_url || place.photoUrl;
  const placeUrl = place.place_url || place.placeUrl;
  const starDisplay = StarRating(rating);

  const addToDiary = () => {
    addPlaceToDiary({ name, rating, neighborhood, placeUrl, photoUrl });
  };
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
      {showAddButton && (
        <Button onPress={addToDiary} title='Add to diary'></Button>
      )}
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
