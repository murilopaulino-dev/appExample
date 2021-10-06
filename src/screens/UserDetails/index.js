import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import _ from 'lodash';
import Screen from '../../components/Screen';
import { ROLES } from '../../constants';
import UserService from '../../services/UserService';
import errorHandler from '../../utils/errorHandler';
import Button from '../../components/Button';
import { successToast } from '../../utils/toast';

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
      errorHandler(error);
    }
    setLoading(false);
  }, [userId]);

  const changeUserRole = async newRole => {
    setSavingUser(true);
    try {
      user.role = newRole;
      await UserService.saveUser(user);
      successToast('Changed user role');
      fetchUser();
    } catch (error) {
      errorHandler(error);
    }
    setSavingUser(false);
  };

  const onDeleteUser = async () => {
    setSavingUser(true);
    try {
      await UserService.deleteUser(user.idToken);
      navigation.goBack();
    } catch (error) {
      errorHandler(error);
    }
    setSavingUser(false);
  };

  if (loading) return <ActivityIndicator />;

  return (
    <Screen>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.role}</Text>
      <View style={{ flexDirection: 'row' }}>
        {_.map(ROLES, role => (
          <Button
            title={role}
            onPress={() => changeUserRole(role)}
            loading={savingUser}
            disabled={role === user.role}
          />
        ))}
      </View>
      <Button title="Delete User" loading={savingUser} onPress={onDeleteUser} />
    </Screen>
  );
};

export default React.memo(UserDetails);
