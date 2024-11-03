import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../principal/domain/Review';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./testimonial.component.css'],

})
export class TestimonialComponent implements OnInit {
@Input() reviewers!: Review[]
  constructor() { }

  ngOnInit() {
  }

}
