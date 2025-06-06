import { Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: PokemonListComponent,
    title: 'Pokedex | Explore Pokémon: Stats, Abilities & Sprites',
  },
  // Catch all - 404 not found
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Pokedex | Page Not Found',
  },
];
