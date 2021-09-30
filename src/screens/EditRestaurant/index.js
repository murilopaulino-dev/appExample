import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import RestaurantService from '../../services/RestaurantService';

const EditRestaurant = ({}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const user = useSelector(state => state.user);

  const onSave = async () => {
    try {
      const restaurantDoc = {
        id,
        name,
        // na hora de criar o owner tem que ver quando estiver só editando o campo
        // para o admin não alterar o owner de um outro restaurante pra ele na hora de salvar
        owner: user.id,
      };
      await RestaurantService.saveRestaurant(restaurantDoc);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Screen>
      <View style={{flexDirection: 'row'}}>
        <Text>ID</Text>
        <TextInput value={id} onChangeText={setId} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>Name</Text>
        <TextInput value={name} onChangeText={setName} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
      </View>
      <Button title="Save" onPress={onSave} />
    </Screen>
  );
};

export default React.memo(EditRestaurant);
