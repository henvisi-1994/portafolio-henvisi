import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../../admin/skill/domain/Skill';

@Component({
  selector: 'app-skill',
  templateUrl: './Skill.component.html',
  imports: [CommonModule],

  styleUrls: ['./Skill.component.css'],
  standalone: true,

})
export class SkillComponent implements OnInit {
@Input() skills!: Skill[]
  constructor() { }

  ngOnInit() {
  }

}
