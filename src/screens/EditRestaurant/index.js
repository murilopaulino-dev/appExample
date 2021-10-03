import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import RestaurantService from '../../services/RestaurantService';
import routes from '../../navigation/routes';
import { checkIfUserIsAdmin } from '../../utils/user';
import { generateNewId } from '../../utils';

const EditRestaurant = ({ route, navigation }) => {
  const editingRestaurant = route.params;
  const [name, setName] = useState(editingRestaurant?.name ?? '');
  const user = useSelector(state => state.user);
  const userIsAdmin = checkIfUserIsAdmin(user);

  const onSave = async () => {
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
      console.log('error', error);
    }
  };

  const onDelete = async () => {
    try {
      await RestaurantService.deleteRestaurant(editingRestaurant.id);
      navigation.navigate(routes.HOME);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row' }}>
        <Text>ID </Text>
        <Text>{editingRestaurant?.id || 'New Restaurant'}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>Name</Text>
        <TextInput value={name} onChangeText={setName} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
      </View>
      {userIsAdmin && (
        <View>
          <Text>Admin fields</Text>
          {!!editingRestaurant && <Button title="Delete" onPress={onDelete} />}
        </View>
      )}
      <Button title="Save" onPress={onSave} />
    </Screen>
  );
};

export default React.memo(EditRestaurant);
