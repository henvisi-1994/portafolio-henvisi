import { Component, Input, OnInit } from '@angular/core';
import { UserHome } from '../../admin/AboutMe/domain/UserHome';
import { Setting } from '../../admin/Setting/domain/Setting';

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
