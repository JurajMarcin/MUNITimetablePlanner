import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Lesson, lessonSort, Timetable } from '../data';
import { ShowService } from '../show.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  showAll = false;

  timetable: Timetable;
  courses: { [name: string]: Lesson[] } = null;

  public get coursesKeys() : string[] {
    return Object.keys(this.courses).sort();
  }

  constructor(private api: ApiService, private show: ShowService) { }

  ngOnInit() {
    this.showAll = this.show.getShowAll();
    this.initCourses();
    this.api.loaded.subscribe(() => this.initCourses());
    this.api.changed.subscribe(() => this.initCourses());
    this.show.changed.subscribe(showAll => {
      this.showAll = showAll;
      this.initDisplayCourses();
    });
  }

  initCourses() {
    this.timetable = this.api.getTimetable();
    if (this.timetable) {
      this.initDisplayCourses();
    }
  }

  initDisplayCourses() {
    this.courses = {};
    this.timetable.lessons.sort(lessonSort).forEach(lesson => {
      if (!lesson.hidden || this.showAll) {
        if (!this.courses[lesson.course]) {
          this.courses[lesson.course] = [];
        }
        this.courses[lesson.course].push(lesson);
      }
    });
  }

  getSlotClasses(lesson: Lesson) {
    return lesson ? [lesson.type, 'priority-' + lesson.priority, lesson.hidden ? 'hidden' : 'shown'] : ['break'];
  }
}
