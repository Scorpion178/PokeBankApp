export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
}

export interface PokemonDetail extends PokemonListItem {
  height: number;
  weight: number;
  types: PokemonTypeSlot[];
}

