import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DataManager } from '../../shared/aplications/DataManager';
import { Home } from './domain/home';
import { catchError, map, of } from 'rxjs';


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
  homeModel: Home= new Home(); // Se declara la variable para almacenar la lista de objetos Home
  constructor(@Inject(PLATFORM_ID) private platformId: NonNullable<unknown>,    private homeManager: DataManager<Home>,
) {}

  ngOnInit() {
    this.toggleMenu()
    this.checkMobileView();
    this.listarData();
  }
  listarData() {
    this.homeManager.loadData('home')
    .pipe(
      map(data => data.flat()[0] as Home),
      catchError(error => {
        // Handle errors here, e.g., log error, display user message, etc.
        console.error('Error fetching data:', error);
        return of(null as unknown as Home); // Or return a default value
      })
    )
    .subscribe(homeModel => {
      if (homeModel) {
        console.log(homeModel);

        this.homeModel = homeModel;
      }
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
