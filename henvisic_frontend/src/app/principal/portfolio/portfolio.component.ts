import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from '../../admin/category/domain/Category';
import { Portafolio } from '../../admin/portafolio/domain/Portafolio';

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
