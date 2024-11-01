import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DataManager } from '../../shared/aplications/DataManager';
import { Home } from './domain/home';


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
  home:Home [] []= [[]];
  homeModel: Home[] = []; // Se declara la variable para almacenar la lista de objetos Home
  constructor(@Inject(PLATFORM_ID) private platformId: NonNullable<unknown>,    private homeManager: DataManager<Home>,
) {}

  ngOnInit() {
    this.toggleMenu()
    this.checkMobileView();
    this.listarData();
  }
  listarData() {
    this.homeManager.loadData('home').subscribe((data) => {
      this.home= data;
      const flattenedHome: Home[] = this.home.flat() as Home[]; // El casting garantiza que TypeScript trate el resultado como `Home[]`
      this.homeModel = flattenedHome

    });
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
