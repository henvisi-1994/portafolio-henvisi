import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  imports: [CommonModule],
  styleUrls: ['./video-modal.component.css'],
  standalone:true
})
export class VideoModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
