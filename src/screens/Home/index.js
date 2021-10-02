import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import FilterSort from '../../components/FilterSort';
import RestaurantCard from '../../components/RestaurantCard';
import Screen from '../../components/Screen';
import { ORDER } from '../../constants';
import routes from '../../navigation/routes';
import RestaurantService from '../../services/RestaurantService';
import {
  checkIfUserRoleIsOwner,
  userCanCreateRestaurants,
} from '../../utils/user';

const Home = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(ORDER.DESC);
  const user = useSelector(state => state.user);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const fetchData = useCallback(async (sortOrder) => {
    setRefreshing(true);
    try {
      const filter = [];
      if (checkIfUserRoleIsOwner(user)) filter.push(['owner', '==', user.id]);
      const response = await RestaurantService.getAllRestaurants(filter, sortOrder);
      setRestaurants(response);
    } catch (error) {
      console.log('error', error);
    }
    setRefreshing(false);
  }, [user]);

  const renderItem = ({ item: restaurant }) => (
    <RestaurantCard data={restaurant} />
  );

  const openNewRestaurantPage = () => {
    navigation.navigate(routes.EDIT_RESTAURANT);
  };

  return (
    <Screen style={styles.container} scroll={false}>
      <FilterSort order={order} onChangeOrder={setOrder} />
      {userCanCreateRestaurants(user) && (
        <Button title="New Restaurant" onPress={openNewRestaurantPage} />
      )}
      <FlatList
        style={styles.flatList}
        data={restaurants}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={fetchData}
        contentContainerStyle={{ padding: 10 }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
});

export default React.memo(Home);
