import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import {
  Pokemon,
  PokemonAbility,
  PokemonDetail,
  PokemonStat,
} from '../../models/pokemon';
import { BehaviorSubject, finalize, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NativeDialogComponent } from '../../shared/native-dialog/native-dialog.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [AsyncPipe, NativeDialogComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent implements OnInit {
  // Children
  @ViewChild(NativeDialogComponent) nativeDialog!: NativeDialogComponent;
  // Variables
  pokemons$!: Observable<Pokemon[]>; // Bind to this observable in the template
  private currentPage: number = 0;
  private limit: number = 10;
  pokemon$!: Observable<PokemonDetail>;
  // Subjects
  private pageSubject = new BehaviorSubject<number>(this.currentPage);
  // Services
  private pokeApiService = inject(PokeApiService);

  ngOnInit(): void {
    this.pokemons$ = this.pageSubject.pipe(
      switchMap((page) => this.pokeApiService.getPokemons(page, this.limit))
    );
  }

  get getCurrentPage(): number {
    return this.currentPage;
  }

  nextPage(): void {
    this.currentPage++;
    this.pageSubject.next(this.currentPage);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.pageSubject.next(this.currentPage);
    }
  }

  viewPokemonDetail(pokemon: Pokemon): void {
    const dialog = this.nativeDialog;
    this.pokemon$ = this.pokeApiService.getPokemon(pokemon.id).pipe(
      tap(() => {
        dialog.title = pokemon.name;
      }),
      finalize(() => {
        dialog.open();
      })
    );
  }

  pokemonStatNames(stats: PokemonStat[]): string[] {
    return stats.map((item) => item.name);
  }

  pokemonAbilityNames(abilities: PokemonAbility[]): string {
    if (!abilities.length) {
      return 'N/A';
    }
    return abilities.map((item) => item.name).join(', ');
  }
}
