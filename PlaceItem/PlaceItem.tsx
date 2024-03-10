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
import { storePlaceInStorage } from '../utils/asyncStorage';

interface Props {
  place: Place;
  showAddButton: boolean;
}

const PlaceItem = ({ place, showAddButton }: Props) => {
  const [wasAdded, setWasAdded] = React.useState(false);
  const { placeId, name, rating, neighborhood } = place;
  const photoUrl = place.photoUrl;
  const placeUrl = place.placeUrl;
  const starDisplay = StarRating(rating);

  const handleAdd = async () => {
    try {
      const addedPlace = await addPlaceToDiary({
        placeId,
        name,
        rating,
        neighborhood,
        placeUrl,
        photoUrl,
      });
      addedPlace && storePlaceInStorage(addedPlace);
      setWasAdded(true);
    } catch (error) {
      console.error('Error adding: ', error);
    }
    // storePlaceInStorage({ name, rating, neighborhood, placeUrl, photoUrl });
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
        <Button
          onPress={handleAdd}
          title={wasAdded ? 'Added!' : 'Add to diary'}
          disabled={wasAdded}
        ></Button>
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
