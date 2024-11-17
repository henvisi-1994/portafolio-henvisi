import { Component, Input, OnInit } from '@angular/core';
import { Setting } from '../../admin/Setting/domain/Setting';
import { UserHome } from '../../admin/AboutMe/domain/UserHome';

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
