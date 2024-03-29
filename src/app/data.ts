export class Timetable {
  public hours: Hour[];
  public lessons: Lesson[];
  public comments: {id: string, comment: string}[];
}

export class Hour {
  public week?: 'both' | 'odd' | 'even' = 'both';
  public day?: Day;
  public from: Date;
  public to: Date;
}

export enum Day {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6
}

export class Lesson {
  public id: string;
  public course: string;
  public type: 'lecture' | 'seminar';
  public name: string;
  public rooms?: string[];
  public teachers?: { id: string, name: string }[];
  public time?: Hour;
  public commentIds: string[];

  public faculty: string;
  public term: string;

  public priority?: number;
  public hidden?: boolean;
}

export class DisplayTimetable {
  public hours: Hour[];
  public days: DisplayDay[];
}

export class DisplayDay {
  public index: number;
  public lines: DisplayLine[];
}

export class DisplayLine {
  public index: number;
  public slots: Slot[];
}

export class Slot {
  public lesson: Lesson;
  public start: number;
  public span: number;
}

export const getSpan = (lesson: Lesson): number => {
  const end = Math.round((lesson.time.to.getUTCHours() * 60 + lesson.time.to.getUTCMinutes()) / 60);
  const start = Math.round((lesson.time.from.getUTCHours() * 60 + lesson.time.from.getUTCMinutes()) / 60);
  return end - start;
};


export const getDay = (str: string): Day => {
  switch (str) {
    case 'Po': return Day.MONDAY;
    case 'Út': return Day.TUESDAY;
    case 'St': return Day.WEDNESDAY;
    case 'Čt': return Day.THURSDAY;
    case 'Pá': return Day.FRIDAY;
    case 'So': return Day.SATURDAY;
    case 'Ně': return Day.SUNDAY;
  }
};

export const getTime = (str: string): Date => {
  str = ('0' + str).slice(-5);
  return new Date(`1900-01-01T${str}:00Z`);
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
};

export const lessonSort = (lesson1: Lesson, lesson2: Lesson) => {
  if (lesson1.priority != lesson2.priority) {
    return lesson1.priority - lesson2.priority;
  }
  if (lesson1.name < lesson2.name) {
    return -1;
  }
  if (lesson1.name > lesson2.name) {
    return 1;
  }
  return 0;
}
