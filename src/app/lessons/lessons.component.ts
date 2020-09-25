import { Component, OnInit } from '@angular/core';
import { Timetable, Course, Lesson } from '../data';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  timetable: Timetable;
  courses: Course[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.timetable = this.api.getSavedTimetable();
    this.init();
  }

  init() {
    const tempCourses: { [id: string]: Course } = {};
    for (const lesson of this.timetable.lessons) {
      if (Object.keys(tempCourses).includes(lesson.course)) {
        tempCourses[lesson.course].lessons.push(lesson);
      } else {
        tempCourses[lesson.course] = { id: lesson.course, lessons: [lesson] };
      }
    }
    this.courses = Object.values(tempCourses).sort((a, b) => a.lessons.length - b.lessons.length);
  }

  getLessonClasses(lesson: Lesson): string[] {
    return ['lesson', lesson.type, 'priority-' + lesson.priority, lesson.hidden ? 'hidden' : 'shown'];
  }
}
