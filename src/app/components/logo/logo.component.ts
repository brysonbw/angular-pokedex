import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  // Variables
  readonly logo: string = 'assets/img/pokedex_logo.png';
}
