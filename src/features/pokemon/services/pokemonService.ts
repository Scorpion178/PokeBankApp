import { pokeApiClient, mapApiError } from '@core/api/httpClient';
import { getJson, saveJson } from '@core/storage/mmkv';
import type { PokemonDetail } from '../types';

const POKEMON_CACHE_KEY = 'pokemon:list:v1';

interface PokeApiListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

interface PokeApiPokemonResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonListResult {
  items: PokemonDetail[];
}

export const getCachedPokemonList = (): PokemonDetail[] | null =>
  getJson<PokemonDetail[]>(POKEMON_CACHE_KEY);

export const fetchPokemonList = async (
  limit = 20,
  offset = 0,
): Promise<PokemonListResult> => {
  try {
    const listResponse = await pokeApiClient.get<PokeApiListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    );

    const detailed = await Promise.all(
      listResponse.data.results.map(async item => {
        const pokemonResponse =
          await pokeApiClient.get<PokeApiPokemonResponse>(item.url);
        const data = pokemonResponse.data;

        const artwork =
          data.sprites.other?.['official-artwork']?.front_default ??
          data.sprites.front_default ??
          '';

        const listItem: PokemonDetail = {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default ?? '',
          height: data.height,
          weight: data.weight,
          types: data.types,
        };

        // Prefer artwork for modal image, keep front_default for list
        return {
          ...listItem,
          image: data.sprites.front_default ?? artwork ?? '',
        };
      }),
    );

    saveJson(POKEMON_CACHE_KEY, detailed);

    return { items: detailed };
  } catch (error) {
    throw mapApiError(error);
  }
};

