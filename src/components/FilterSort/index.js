import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { COLORS, ORDER } from '../../constants';

const FilterSort = ({
  order,
  onChangeOrder,
  lowerRatingFilter,
  setLowerRatingFilter,
  higherRatingFilter,
  setHigherRatingFilter,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={loading}
        style={styles.flexRow}
        onPress={() =>
          onChangeOrder(order === ORDER.ASC ? ORDER.DESC : ORDER.ASC)
        }>
        <Text style={styles.label}>Order: </Text>
        <Text style={styles.label}>
          {order === ORDER.ASC ? 'Ascending' : 'Descending'} (press to change)
        </Text>
      </TouchableOpacity>
      <View style={styles.flexRow}>
        <Text style={styles.label}>Filter: </Text>
        <Rating
          fractions={2}
          startingValue={lowerRatingFilter || 0}
          imageSize={25}
          readonly={loading}
          onFinishRating={setLowerRatingFilter}
          tintColor={COLORS.primaryColor}
        />
        <Text> --- </Text>
        <Rating
          fractions={2}
          startingValue={higherRatingFilter || 0}
          imageSize={25}
          readonly={loading}
          onFinishRating={setHigherRatingFilter}
          tintColor={COLORS.primaryColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  flexRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#BEBEBE',
    fontWeight: 'bold',
  },
});

export default React.memo(FilterSort);
