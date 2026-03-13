import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, useTheme, Button } from 'react-native-paper';
import type { PokemonDetail } from '../types';

interface Props {
  visible: boolean;
  pokemon: PokemonDetail | null;
  onDismiss: () => void;
}

export const PokemonDetailModal: React.FC<Props> = ({
  visible,
  pokemon,
  onDismiss,
}) => {
  const theme = useTheme();

  if (!pokemon) {
    return null;
  }

  const types = pokemon.types.map(t => t.type.name).join(', ');

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text variant="titleLarge" style={styles.name}>
            {pokemon.name}
          </Text>

          {!!pokemon.image && (
            <Image source={{ uri: pokemon.image }} style={styles.image} />
          )}

          <View style={styles.row}>
            <Text variant="bodyMedium">Peso:</Text>
            <Text variant="bodyMedium">{pokemon.weight}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="bodyMedium">Altura:</Text>
            <Text variant="bodyMedium">{pokemon.height}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="bodyMedium">Tipos:</Text>
            <Text variant="bodyMedium" style={styles.types}>
              {types}
            </Text>
          </View>

          <Button
            accessibilityRole="button"
            mode="contained"
            onPress={onDismiss}
            style={styles.closeButton}>
            Cerrar
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  scroll: {
    padding: 16,
    alignItems: 'center',
  },
  name: {
    textTransform: 'capitalize',
    marginBottom: 12,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 4,
  },
  types: {
    textTransform: 'capitalize',
    textAlign: 'right',
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'stretch',
  },
});

