import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import _ from 'lodash';
import Screen from '../../components/Screen';
import UserService from '../../services/UserService';
import UserCard from '../../components/UserCard';
import { useFocusEffect } from '@react-navigation/core';
import errorHandler from '../../utils/errorHandler';

const UsersList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await UserService.getUsers();
      setUsers(response);
    } catch (error) {
      errorHandler(error);
    }
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [fetchUsers]),
  );

  if (loading) return <ActivityIndicator />;

  return (
    <Screen>
      {_.map(users, user => (
        <UserCard key={user.id} user={user} />
      ))}
    </Screen>
  );
};

export default React.memo(UsersList);
