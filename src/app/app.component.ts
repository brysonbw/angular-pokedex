import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  // Variables
  showHeader = false;
  showFooter = false;

  // Subscriptions
  private toggleHeaderFooterVisibilitySubscription!: Subscription;

  // Services
  private router = inject(Router);

  ngOnInit(): void {
    this.toggleHeaderFooterVisibilitySubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routerEvent) => {
        if (routerEvent.url === '' || routerEvent.url === '/') {
          this.toggleHeaderFooterVisibility(true);
        } else {
          this.toggleHeaderFooterVisibility(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.toggleHeaderFooterVisibilitySubscription.unsubscribe();
  }

  private toggleHeaderFooterVisibility(value: boolean): void {
    this.showFooter = value;
    this.showHeader = value;
  }
}
