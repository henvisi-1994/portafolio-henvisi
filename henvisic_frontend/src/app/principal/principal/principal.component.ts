import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule,MatToolbarModule,CommonModule],

})
export class PrincipalComponent implements OnInit {
  isMenuOpen = false;
  isMobileView = false;

  constructor(@Inject(PLATFORM_ID) private platformId: NonNullable<unknown>) {}

  ngOnInit() {
    this.toggleMenu()
    this.checkMobileView();

  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  checkMobileView() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 768; // Comprueba el tamaño de la ventana
    }
  }

  // Revisa el tamaño de la ventana al redimensionar
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 768;
    }
  }
}
