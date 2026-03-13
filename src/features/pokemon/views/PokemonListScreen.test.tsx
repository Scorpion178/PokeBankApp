import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { PokemonListScreen } from './PokemonListScreen';

const mockFetch = jest.fn();
const mockGetCache = jest.fn();

jest.mock('../services/pokemonService', () => ({
  fetchPokemonList: (...args: unknown[]) => mockFetch(...args),
  getCachedPokemonList: () => mockGetCache(),
}));

const renderWithProviders = () => {
  return render(
    <PaperProvider>
      <PokemonListScreen />
    </PaperProvider>,
  );
};

describe('PokemonListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente y muestra lista después de cargar', async () => {
    mockGetCache.mockReturnValue([]);
    mockFetch.mockResolvedValueOnce({
      items: [
        {
          id: 1,
          name: 'bulbasaur',
          image: 'https://example.com/bulbasaur.png',
          height: 7,
          weight: 69,
          types: [],
        },
      ],
    });

    const { getByText, getByTestId } = renderWithProviders();

    await waitFor(() => {
      expect(getByTestId('pokemon-list')).toBeTruthy();
      expect(getByText(/bulbasaur/i)).toBeTruthy();
    });
  });

  it('filtra por nombre usando el buscador', async () => {
    mockGetCache.mockReturnValue([]);
    mockFetch.mockResolvedValueOnce({
      items: [
        {
          id: 1,
          name: 'bulbasaur',
          image: 'https://example.com/bulbasaur.png',
          height: 7,
          weight: 69,
          types: [],
        },
        {
          id: 2,
          name: 'ivysaur',
          image: 'https://example.com/ivysaur.png',
          height: 10,
          weight: 130,
          types: [],
        },
      ],
    });

    const { getByPlaceholderText, queryByText } = renderWithProviders();

    await waitFor(() => {
      expect(queryByText(/bulbasaur/i)).toBeTruthy();
      expect(queryByText(/ivysaur/i)).toBeTruthy();
    });

    const searchInput = getByPlaceholderText('Buscar Pokémon');
    fireEvent.changeText(searchInput, 'ivy');

    await waitFor(() => {
      expect(queryByText(/ivysaur/i)).toBeTruthy();
      expect(queryByText(/bulbasaur/i)).toBeNull();
    });
  });

  it('maneja errores de API mostrando Snackbar', async () => {
    mockGetCache.mockReturnValue([]);
    mockFetch.mockRejectedValueOnce(new Error('API error'));

    const { findByText } = renderWithProviders();

    const errorText = await findByText(/API error/i);
    expect(errorText).toBeTruthy();
  });
});

