import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // Variables
  faAngular = faAngular;
  // Services
  private appService = inject(AppService);

  // Getters
  get currentYear(): string {
    const date = new Date();
    return date.getFullYear().toString();
  }

  get appTitle(): string {
    return this.appService.APP_TITLE;
  }
}
