import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principal-layout',
  standalone: true,
  templateUrl: './principal-layout.component.html',
  imports: [RouterOutlet],

  styleUrls: ['./principal-layout.component.css']
})
export class PrincipalLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
