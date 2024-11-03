import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../principal/domain/Service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  imports: [CommonModule],
  styleUrls: ['./service.component.css'],
  standalone: true,

})
export class ServiceComponent implements OnInit {
@Input() services!:Service[]
  constructor() { }

  ngOnInit() {
  }

}
