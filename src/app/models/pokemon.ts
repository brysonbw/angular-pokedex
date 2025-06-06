export interface Pokemon {
  id: string;
  name: string;
  url: string;
}

export interface PokemonAbility {
  name: string;
}

export interface PokemonStat {
  value: number;
  name: string;
}

export interface PokemonDetail {
  id: string;
  base_experience: number;
  name: string;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: string[];
}

export interface PokeAPIPokemonsResponse {
  count: number;
  next: string;
  previous: null | string;
  results: Pokemon[];
}

export interface PokeAPIPokemonResponse
  extends Omit<PokemonDetail, 'abilities' | 'stats' | 'sprites'> {
  abilities: {
    ability: PokemonAbility;
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  sprites: Record<string, string>;
}
