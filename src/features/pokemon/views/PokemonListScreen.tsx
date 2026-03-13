import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import {
  ActivityIndicator,
  FAB,
  Searchbar,
  Snackbar,
  Text,
} from 'react-native-paper';
import { PokemonCard } from '../components/PokemonCard';
import { PokemonDetailModal } from '../components/PokemonDetailModal';
import { fetchPokemonList, getCachedPokemonList } from '../services/pokemonService';
import type { PokemonDetail } from '@shared/types/poke-types';

export const PokemonListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [pokemon, setPokemon] = useState<PokemonDetail[]>([]);
  const [filtered, setFiltered] = useState<PokemonDetail[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<PokemonDetail | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const hasData = pokemon.length > 0;

  const filterData = useMemo(
    () => (query: string, source: PokemonDetail[]) => {
      if (!query.trim()) {
        return source;
      }
      const normalized = query.toLowerCase();
      return source.filter(item => item.name.toLowerCase().includes(normalized));
    },
    [],
  );

  const applyFilter = (query: string, source: PokemonDetail[]) => {
    const result = filterData(query, source);
    setFiltered(result);
  };

  const loadFromCache = () => {
    const cached = getCachedPokemonList();
    if (cached && cached.length > 0) {
      setPokemon(cached);
      applyFilter(search, cached);
    }
  };

  const loadPokemon = async (showLoader = true) => {
    if (showLoader) {
      setLoading(true);
    }
    setError(null);

    try {
      const result = await fetchPokemonList();
      setPokemon(result.items);
      applyFilter(search, result.items);
    } catch (e: any) {
      setError(e?.message ?? 'Error al cargar Pokémon.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFromCache();
    loadPokemon(!hasData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyFilter(search, pokemon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pokemon]);

  const handleSelect = (item: PokemonDetail) => {
    setSelected(item);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Searchbar
        placeholder="Buscar Pokémon"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        accessibilityLabel="Buscador de Pokémon"
      />

      {loading && !hasData ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator animating size="large" />
          <Text style={styles.loaderText}>Cargando Pokémon...</Text>
        </View>
      ) : (
        <FlashList
          testID="pokemon-list"
          data={filtered}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              onPress={() => handleSelect(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>No se encontraron Pokémon.</Text>
            </View>
          }
        />
      )}

      <FAB
        icon="refresh"
        accessibilityLabel="Recargar Pokémon"
        style={styles.fab}
        onPress={() => loadPokemon(true)}
      />

      <PokemonDetailModal
        visible={modalVisible}
        pokemon={selected}
        onDismiss={() => setModalVisible(false)}
      />

      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        duration={4000}>
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 6,
  },
  listContent: {
    paddingBottom: 72,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

