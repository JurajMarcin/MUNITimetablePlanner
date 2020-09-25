import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Lesson } from '../data';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss']
})
export class LessonEditComponent {

  @Input()
  public lesson: Lesson;

  constructor(private api: ApiService) { }

  changePriority(value: number) {
    const newPriority = this.lesson.priority + value;
    if (newPriority > 0 && newPriority < 17) {
      this.lesson.priority = newPriority;
      this.api.changed.emit();
    }
  }

  changeVisibility(hidden: boolean) {
    this.lesson.hidden = hidden;
    this.api.changed.emit();
  }
}
