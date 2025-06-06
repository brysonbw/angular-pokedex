import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // Variables
  readonly GitHub: string = 'assets/img/github_logo.png';
  faGithub = faGithub;
}
