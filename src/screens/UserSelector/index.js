import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { ROLES } from '../../constants';
import { setUser } from '../../redux/actions/user';
import Screen from '../../components/Screen';
import routes from '../../navigation/routes';
import { generateNewId } from '../../utils';
import Button from '../../components/Button';

const UserSelector = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  const createUser = role => {
    dispatch(
      setUser({
        id: userId || `user_id_${generateNewId()}`,
        role,
      }),
    );
    navigation.navigate(routes.HOME);
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text>UserId</Text>
        <TextInput
          value={userId}
          onChangeText={setUserId}
          style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }}
          autoCapitalize="none"
        />
      </View>
      <Button title="Normal User" onPress={() => createUser(ROLES.NORMAL)} />
      <Button title="Owner" onPress={() => createUser(ROLES.OWNER)} />
      <Button title="Admin" onPress={() => createUser(ROLES.ADMIN)} />
    </Screen>
  );
};

export default React.memo(UserSelector);
