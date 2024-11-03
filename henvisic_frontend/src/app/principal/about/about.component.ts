import { Component, Input, OnInit } from '@angular/core';
import { Model } from '../../shared/interfaces/Model';
import { EntidadAuditable } from '../../shared/domain/EntidadAuditable';
import { Setting } from '../principal/domain/Setting';
import { UserHome } from '../principal/domain/UserHome';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,

})

export class AboutComponent  implements OnInit {
  @Input() setting!: Setting | null;
  @Input() user!: UserHome | null;

  constructor() { }

  ngOnInit() {

  }

}
