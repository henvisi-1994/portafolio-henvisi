import { Component, Input, OnInit } from '@angular/core';
import { Education } from '../principal/domain/Education';
import { CommonModule } from '@angular/common';
import { Experience } from '../principal/domain/Experience';

@Component({
  selector: 'app-quality',
  imports: [CommonModule],
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css'],
  standalone: true,

})
export class QualityComponent implements OnInit {
@Input() educations!: Education[]
@Input() experiences!: Experience[]
  constructor() { }

  ngOnInit() {
  }

}
