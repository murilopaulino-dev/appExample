import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import RestaurantCard from '../../components/RestaurantCard';
import Screen from '../../components/Screen';
import RestaurantService from '../../services/RestaurantService';
import { userCanCreateRestaurants } from '../../utils/user';

const Home = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    try {
      // const response = await RestaurantService.getAllRestaurants();
      const response = await RestaurantService.getMyRestaurants(user.id);
      setRestaurants(response);
    } catch (error) {
      console.log('error', error);
    }
    setRefreshing(false);
  }, [user]);

  const renderItem = ({ item: restaurant }) => (
    <RestaurantCard data={restaurant} />
  );

  return (
    <Screen style={styles.container}>
      {userCanCreateRestaurants(user) && <Button title="New Restaurant" />}
      <FlatList
        style={styles.flatList}
        data={restaurants}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={fetchData}
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
