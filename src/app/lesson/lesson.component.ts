import { Component, Input } from '@angular/core';
import { Lesson } from '../data';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent {

  @Input()
  public lesson: Lesson;
  @Input()
  public compactMode = false;

  constructor() { }
}
