import { Component, Input, OnInit } from '@angular/core';
import { Setting } from '../../principal/domain/Setting';

@Component({
  selector: 'app-footer',
  templateUrl: './Footer.component.html',
  standalone: true,
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {
@Input() setting!: Setting | null;

  constructor() { }

  ngOnInit() {
  }

}
