import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Lesson } from '../data';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss']
})
export class LessonEditComponent implements OnInit {

  @Input()
  public lesson: Lesson;

  public priority: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.priority = this.lesson.priority;
  }

  onChange(x) {
    console.log(x);
  }

  setPriority(value: number) {
    if (value > 0 && value < 17) {
      this.lesson.priority = +value;
      this.api.changed.emit();
    } else {
      alert('Priority has to be between 1 and 16');
      this.priority = this.lesson.priority;
    }
  }

  changePriority(value: number) {
    const newPriority = this.lesson.priority + +value;
    if (newPriority > 0 && newPriority < 17) {
      this.lesson.priority = newPriority;
      this.priority = newPriority;
      this.api.changed.emit();
    }
  }

  changeVisibility(hidden: boolean) {
    this.lesson.hidden = hidden;
    this.api.changed.emit();
  }
}
