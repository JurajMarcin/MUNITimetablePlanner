import { Component, OnInit, Input } from '@angular/core';
import { DisplayTimetable, Timetable, Lesson, DisplayLine, getSpan, DisplayDay } from '../data';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  @Input()
  public showHidden = false;

  displayTimetable: DisplayTimetable;
  timetable: Timetable;

  dayNames = ['PO', 'UT', 'ST', 'ŠT', 'PI', 'SO', 'NE'];
  unsavedChanges = false;
  compactMode = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.api.getExampleXml().subscribe(xml => {
    //   this.timetable = this.api.importISTimetable(xml);
    //   this.initDisplayTimetable();
    // });
    this.compactMode = this.api.getCompactMode();
    this.initTimetable(this.api.getSavedTimetable());
    this.api.imported.subscribe(timetable => {
      this.initTimetable(timetable);
      this.unsavedChanges = true;
    });
  }

  initTimetable(timetable: Timetable) {
    this.timetable = timetable;
    this.initDisplayTimetable();
  }

  initDisplayTimetable() {
    this.displayTimetable = null;
    if (!this.timetable) { return; }
    this.clearDisplayTimetable(this.timetable.hours.length);
    this.displayTimetable.hours = this.timetable.hours;
    this.timetable.lessons.sort((a, b) => a.priority - b.priority).forEach(lesson => {
      if (lesson.hidden && !this.showHidden) { return; }
      const day = lesson.time.day;
      let inserted = false;
      for (const line of this.displayTimetable.days[day].lines) {
        if (this.insertToLine(line, lesson)) {
          inserted = true;
          break;
        }
      }
      if (!inserted) {
        const line = this.clearLine(this.displayTimetable.days[day].lines.length, this.timetable.hours.length);
        this.insertToLine(line, lesson);
        this.displayTimetable.days[day].lines.push(line);
      }
    });
  }

  insertToLine(line: DisplayLine, lesson: Lesson): boolean {
    const offset = this.displayTimetable.hours[0].from.getUTCHours();
    const start = lesson.time.from.getUTCHours() - offset;
    const span = getSpan(lesson);
    let i = 0;
    while (line.slots[i].start < start) { i++; }
    let spanToDelete = -1;
    if (line.slots[i].start === start && line.slots[i].lesson === null) {
      line.slots[i].lesson = lesson;
      line.slots[i].span = span;
      spanToDelete = span - 1;
      if (spanToDelete > 0) {
        line.slots.splice(i + 1, spanToDelete);
      }
      return true;
    }
    return false;
  }

  clearDisplayTimetable(hoursADay = 12) {
    this.displayTimetable = { days: [], hours: [] };
    for (let i = 0; i < 7; i++) {
      const day: DisplayDay = { index: i, lines: [] };
      day.lines.push(this.clearLine(0, hoursADay));
      this.displayTimetable.days.push(day);
    }
  }

  clearLine(index: number, hoursADay = 12): DisplayLine {
    const line: DisplayLine = { index, slots: [] };
    for (let j = 0; j < hoursADay; j++) {
      line.slots.push({ start: j, span: 1, lesson: null });
    }
    return line;
  }

  getSlotClasses(lesson: Lesson) {
    return lesson ? [lesson.type, 'priority-' + lesson.priority, lesson.hidden ? 'hidden' : 'shown'] : ['break'];
  }

  lessonChangedEvent() {
    this.unsavedChanges = true;
  }

  saveTimetable() {
    this.api.saveTimetable(this.timetable);
    this.initDisplayTimetable();
    this.unsavedChanges = false;
  }

  getComment(commentId: string): string {
    const comment = this.timetable.comments.find(c => c.id === commentId);
    return comment ? comment.comment : undefined;
  }

  toggleHiddenLessons(showHidden: boolean) {
    this.saveTimetable();
    this.showHidden = showHidden;
    this.initDisplayTimetable();
  }

  toggleCompactMode() {
    this.compactMode = !this.compactMode;
    this.api.setCompactMode(this.compactMode);
  }
}
