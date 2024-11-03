import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataManager } from '../../shared/aplications/DataManager';
import { Home } from './domain/home';
import { catchError, map, of } from 'rxjs';
import { AboutComponent } from '../about/about.component';
import { QualityComponent } from '../quality/quality.component';
import { SkillComponent } from '../skill/Skill.component';
import { ServiceComponent } from '../service/service.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { TestimonialComponent } from "../testimonial/testimonial.component";
import { ContactComponent } from '../contact/contact.component';
import { VideoModalComponent } from '../video-modal/video-modal.component';
import { UserInfoComponent } from "../User-Info/User-Info.component";
import { FooterComponent } from '../component/Footer/Footer.component';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  standalone: true,
  imports: [MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    CommonModule,
    AboutComponent,
    QualityComponent,
    SkillComponent,
    ServiceComponent,
    PortfolioComponent,
    TestimonialComponent,
    ContactComponent,
    VideoModalComponent,
    UserInfoComponent,
    FooterComponent],

})
export class PrincipalComponent implements OnInit {
  home: Home[][] = [[]];
  homeModel: Home = new Home(); // Se declara la variable para almacenar la lista de objetos Home
  constructor(@Inject(PLATFORM_ID) private platformId: NonNullable<unknown>, private homeManager: DataManager<Home>,
  ) { }

  ngOnInit() {
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
          this.homeModel = homeModel;
        }
      });
  }

}
