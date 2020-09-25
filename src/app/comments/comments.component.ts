import { Component, Input, OnInit } from '@angular/core';
import { Timetable } from '../data';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input()
  public timetable: Timetable;

  constructor() { }

  ngOnInit() {
  }

}
