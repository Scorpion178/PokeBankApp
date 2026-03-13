import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import type { PokemonListItem } from '../types';

interface Props {
  pokemon: PokemonListItem;
  onPress: () => void;
}

export const PokemonCard: React.FC<Props> = ({ pokemon, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress} accessibilityRole="button">
      <Card.Cover source={{ uri: pokemon.image }} style={styles.image} />
      <Card.Content>
        <Text variant="titleMedium" style={styles.name}>
          {pokemon.name}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 6,
    overflow: 'hidden',
  },
  image: {
    backgroundColor: '#f2f2f2',
  },
  name: {
    marginTop: 8,
    textTransform: 'capitalize',
  },
});

