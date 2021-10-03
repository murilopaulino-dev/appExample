import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import _ from 'lodash';
import Screen from '../../components/Screen';
import { ROLES } from '../../constants';
import UserService from '../../services/UserService';

const UserDetails = ({ route, navigation }) => {
  const userId = route.params;
  const [loading, setLoading] = useState(true);
  const [savingUser, setSavingUser] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await UserService.getUser(userId);
      setUser(response);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  }, [userId]);

  const changeUserRole = async newRole => {
    setSavingUser(true);
    try {
      user.role = newRole;
      await UserService.saveUser(user);
      fetchUser();
    } catch (error) {
      console.log('error', error);
    }
    setSavingUser(false);
  };

  const onDeleteUser = async () => {
    setSavingUser(true);
    try {
      await UserService.deleteUser(user.idToken);
      navigation.goBack();
    } catch (error) {
      console.log('error', error);
    }
    setSavingUser(false);
  };

  if (loading) return <ActivityIndicator />;

  return (
    <Screen>
      <Text>{user.email}</Text>
      <Text>{user.role}</Text>
      <View style={{ flexDirection: 'row' }}>
        {_.map(ROLES, role => (
          <Button title={role} onPress={() => changeUserRole(role)} disabled={savingUser || role === user.role} />
        ))}
      </View>
      <Button title="Delete User" disabled={savingUser} onPress={onDeleteUser} />
    </Screen>
  );
};

export default React.memo(UserDetails);
