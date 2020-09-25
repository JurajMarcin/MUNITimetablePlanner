// tslint:disable: prefer-for-of
import { Injectable, EventEmitter } from '@angular/core';
import { Timetable, Lesson, Day, getTime, getDay, getRandomInt } from './data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public imported = new EventEmitter<Timetable>();
  public changed = new EventEmitter();
  public saved = new EventEmitter();

  constructor(private http: HttpClient) { }

  public downloadSavedTimetable() {
    const myBlob = new Blob([window.localStorage.getItem('timetable')], {type: 'application/json'});
    const a = document.createElement('a');
    a.download = 'timetable.json';
    a.href = URL.createObjectURL(myBlob);
    a.click();
    a.parentElement.removeChild(a);
  }

  public openTimetable(json: string): Timetable {
    const timetable: Timetable = JSON.parse(json);
    for (const hour of timetable.hours) {
      hour.from = new Date(hour.from);
      hour.to = new Date(hour.to);
    }
    for (const lesson of timetable.lessons) {
      lesson.time.from = new Date(lesson.time.from);
      lesson.time.to = new Date(lesson.time.to);
    }
    return timetable;
  }

  public getSavedTimetable(): Timetable {
    const timetableData = window.localStorage.getItem('timetable');
    if (timetableData) {
      return this.openTimetable(timetableData);
    }
    return null;
  }

  public saveTimetable(timetable: Timetable) {
    window.localStorage.setItem('timetable', JSON.stringify(timetable));
  }

  public getCompactMode(): boolean {
    return window.localStorage.getItem('compact-mode') === 'on';
  }

  public setCompactMode(value: boolean) {
    window.localStorage.setItem('compact-mode', value ? 'on' : 'off');
  }

  public getExampleXml(): Observable<string> {
    return this.http.get('/assets/rozvrh.xml', { responseType: 'text' });
  }

  public importISTimetable(xml: string): Timetable {
    const parser = new DOMParser();
    const timetableDoc = parser.parseFromString(xml, 'text/xml');
    const timetable: Timetable = { hours: [], lessons: [], comments: [] };
    /* HOURS */
    timetableDoc.querySelectorAll('hodiny hodina').forEach(hourXml => {
      const from = getTime(hourXml.querySelector('od').innerHTML);
      const to = getTime(hourXml.querySelector('do').innerHTML);
      timetable.hours.push({ from, to });
    });
    /* COMMENTS */
    timetableDoc.querySelectorAll('poznamky poznamka').forEach(commentXml => {
      timetable.comments.push({ id: commentXml.id, comment: commentXml.innerHTML });
    });
    /* DAYS */
    timetableDoc.querySelectorAll('tabulka den').forEach(dayXml => {
      dayXml.querySelectorAll('slot').forEach(lessonXml => {
        /* INFO */
        const lessonId = lessonXml.querySelector('akce kod').innerHTML;
        const courseId = lessonId.split('/')[0];
        const lessonType = lessonId.includes('/') ? 'seminar' : 'lecture';
        const lesson: Lesson = {
          id: lessonId,
          course: courseId,
          name: lessonXml.querySelector('akce nazev').innerHTML,
          type: lessonType,
          priority: lessonType === 'lecture' ? 0 : 16,
          rooms: [],
          teachers: [],
          commentIds: []
        };
        /* COMMENTS */
        let comments = '';
        lessonXml.querySelectorAll('poznamka').forEach(commentIdXml => {
          lesson.commentIds.push(commentIdXml.id);
          comments += timetable.comments.find(comment => comment.id === commentIdXml.id).comment;
        });
        /* TIME */
        const weekComment = comments.match(/(lich|sud)/i);
        lesson.time = {
          day: getDay(dayXml.id),
          from: getTime(lessonXml.getAttribute('odcas')),
          to: getTime(lessonXml.getAttribute('docas')),
          week: weekComment === null ? 'both' : (weekComment[0] === 'lich' ? 'odd' : 'even')
        };
        /* ROOMS */
        lessonXml.querySelectorAll('mistnosti mistnost mistnostozn').forEach(roomXml => {
          const room = roomXml.innerHTML;
          if (!lesson.rooms.includes(room)) {
            lesson.rooms.push(room);
          }
        });
        /* TEACHERS */
        lessonXml.querySelectorAll('ucitele ucitel').forEach(teacherXml => {
          const id = teacherXml.querySelector('ucitelid').innerHTML;
          const name = teacherXml.querySelector('uciteljmeno').innerHTML;
          if (lesson.teachers.find(t => t.id === id) === undefined) {
            lesson.teachers.push({ id, name });
          }
        });
        timetable.lessons.push(lesson);
      });
    });
    return timetable;
  }
}
