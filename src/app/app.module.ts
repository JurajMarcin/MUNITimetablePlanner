import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShortTimePipe } from './short-time.pipe';
import { RoomsPipe } from './rooms.pipe';
import { LessonComponent } from './lesson/lesson.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { TimetableComponent } from './timetable/timetable.component';
import { WeekPipe } from './week.pipe';
import { TimetableEditComponent } from './timetable-edit/timetable-edit.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    ShortTimePipe,
    RoomsPipe,
    LessonComponent,
    LessonEditComponent,
    TimetableComponent,
    WeekPipe,
    TimetableEditComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
