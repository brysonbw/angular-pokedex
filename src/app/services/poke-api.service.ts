import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import {
  PokeAPIPokemonResponse,
  PokeAPIPokemonsResponse,
  Pokemon,
  PokemonDetail,
} from '../models/pokemon';
import { capitalizeFirstChar, isURLValid } from '../../utils/helperFunctions';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private readonly POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/';
  private pokemonListCache = new Map<number, Pokemon[]>();
  private pokemonDetailCache = new Map<string, PokemonDetail>();

  constructor(private httpClient: HttpClient) {}

  /**
   * Get list of pokemon
   * @param page
   * @param limit
   */
  getPokemons(page: number, limit: number): Observable<Pokemon[]> {
    const offset = page * limit;
    // Check cache
    if (this.pokemonListCache.has(page)) {
      return of(this.pokemonListCache.get(page)!);
    }
    return this.httpClient
      .get<PokeAPIPokemonsResponse>(
        `${this.POKE_API_BASE_URL}pokemon?offset=${offset}&limit=${limit}`
      )
      .pipe(
        map((response) => {
          return response.results.map((pokemon) => ({
            ...pokemon,
            name: capitalizeFirstChar(pokemon.name),
            id: this.getIdFromUrl(pokemon.url),
          }));
        }),
        tap((data) => this.pokemonListCache.set(page, data)) // Cache new data
      );
  }

  /**
   * Get pokemon item by id
   * @param id
   */
  getPokemon(id: string): Observable<PokemonDetail> {
    // Check cache
    if (this.pokemonDetailCache.has(id)) {
      return of(this.pokemonDetailCache.get(id)!);
    }
    return this.httpClient
      .get<PokeAPIPokemonResponse>(`${this.POKE_API_BASE_URL}pokemon/${id}`)
      .pipe(
        map((response) => {
          const sprites =
            Object.values(response.sprites)?.filter((item: string | null) =>
              isURLValid(item as string)
            ) || [];
          return {
            id,
            sprites,
            base_experience: response.base_experience,
            name: capitalizeFirstChar(response.name),
            abilities: response.abilities.map((item) => {
              return {
                ...item,
                name: capitalizeFirstChar(item.ability.name).replaceAll(
                  '-',
                  ' '
                ),
              };
            }),
            stats: response.stats.map((item) => {
              return {
                value: item.base_stat,
                name: capitalizeFirstChar(item.stat.name).replaceAll('-', ' '),
              };
            }),
          };
        }),
        tap((data) => this.pokemonDetailCache.set(id, data)) // Cache new data
      );
  }

  private getIdFromUrl(url: string): string {
    const parts = url.split('/').filter(Boolean);
    const id = parts[parts.length - 1];
    return !isNaN(Number(id)) ? id : '';
  }
}
