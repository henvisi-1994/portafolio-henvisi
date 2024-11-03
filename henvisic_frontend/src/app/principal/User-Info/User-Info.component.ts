import { Component, Input, OnInit } from '@angular/core';
import { UserHome } from '../principal/domain/UserHome';
import { Setting } from '../principal/domain/Setting';

@Component({
  selector: 'app-user-info',
  standalone: true,
  templateUrl: './User-Info.component.html',
  styleUrls: ['./User-Info.component.css']
})
export class UserInfoComponent implements OnInit {
@Input() user!: UserHome | null
@Input() setting !: Setting | null
  constructor() { }

  ngOnInit() {
  }

}
