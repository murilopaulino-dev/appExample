import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import RestaurantService from '../../services/RestaurantService';
import routes from '../../navigation/routes';
import { checkIfUserIsAdmin } from '../../utils/user';
import { generateNewId } from '../../utils';
import { COLORS } from '../../constants';
import {
  getScreenHeightProportion,
  getScreenWidthProportion,
} from '../../utils/screen';
import Field from '../../components/Field';
import Button from '../../components/Button';
import errorHandler from '../../utils/errorHandler';

const EditRestaurant = ({ route, navigation }) => {
  const editingRestaurant = route.params;
  const [name, setName] = useState(editingRestaurant?.name ?? '');
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user);
  const userIsAdmin = checkIfUserIsAdmin(user);

  const onSave = async () => {
    setLoading(true);
    try {
      const restaurantDoc = {
        ...(editingRestaurant || {}),
        name,
      };
      if (!editingRestaurant) {
        restaurantDoc.id = generateNewId;
        restaurantDoc.owner = user.id;
        restaurantDoc.averageRating = 0;
      }
      await RestaurantService.saveRestaurant(restaurantDoc);
      navigation.navigate(routes.HOME);
    } catch (error) {
      errorHandler(error?.response?.data?.error);
    }
    setLoading(false);
  };

  const onDelete = async () => {
    try {
      await RestaurantService.deleteRestaurant(editingRestaurant.id);
      navigation.navigate(routes.HOME);
    } catch (error) {
      errorHandler(error?.response?.data?.error);
    }
  };

  return (
    <Screen
      style={styles.container}
      innerStyle={styles.innerContainer}
      scroll={false}>
      <View style={styles.centerContainer}>
        {!editingRestaurant && (
          <View style={styles.newRestaurantContainer}>
            <Text style={styles.newRestaurantText}>New Restaurant</Text>
          </View>
        )}
        <Field label="Name" value={name} onChangeText={setName} />
        {userIsAdmin && !!editingRestaurant && (
          <Button title="Delete" onPress={onDelete} style={styles.marginTop} loading={loading} />
        )}
        <Button title="Save" onPress={onSave} style={styles.marginTop} loading={loading} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    borderRadius: 10,
    padding: 12,
    width: getScreenWidthProportion(0.8),
    height: getScreenHeightProportion(0.45),
    backgroundColor: '#D2D2D2',
  },
  newRestaurantContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  newRestaurantText: {
    fontWeight: 'bold',
  },
  marginTop: {
    marginTop: 20,
  },
});

export default React.memo(EditRestaurant);
