import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Lesson } from '../data';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss']
})
export class LessonEditComponent {

  @Input()
  public lesson: Lesson;
  @Output()
  public changed = new EventEmitter();

  constructor() { }

  changePriority(value: number) {
    let newPriority = this.lesson.priority + value;
    if (newPriority > 16) {
      newPriority = 1;
    } else if (newPriority < 1) {
      newPriority = 16;
    }
    this.lesson.priority = newPriority;
    this.changed.emit();
  }

  changeVisibility(hidden: boolean) {
    this.lesson.hidden = hidden;
    this.changed.emit();
  }
}
