import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Portafolio } from '../principal/domain/Portafolio';
import { Category } from '../principal/domain/Category';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  imports: [CommonModule],
  styleUrls: ['./portfolio.component.css'],
  standalone: true,

})
export class PortfolioComponent implements OnInit {
@Input() portfolios!: Portafolio[]
@Input() categories!: Category[]
url = environment.hostUrl

  constructor() { }

  ngOnInit() {
  }

}
