import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../../App';

jest.mock('../features/pokemon/services/pokemonService', () => ({
  fetchPokemonList: jest.fn().mockResolvedValue({
    items: [
      {
        id: 1,
        name: 'bulbasaur',
        image: 'https://example.com/bulbasaur.png',
        height: 7,
        weight: 69,
        types: [
          {
            slot: 1,
            type: { name: 'grass', url: '' },
          },
        ],
      },
    ],
  }),
  getCachedPokemonList: jest.fn().mockReturnValue([]),
}));

describe('Pokemon integration', () => {
  it('muestra la lista de Pokémon dentro de la app', async () => {
    const { getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId('pokemon-list')).toBeTruthy();
    });
  });
});

