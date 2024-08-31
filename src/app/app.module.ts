import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShortTimePipe } from './short-time.pipe';
import { RoomsPipe } from './rooms.pipe';
import { LessonComponent } from './lesson/lesson.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { TimetableComponent } from './timetable/timetable.component';
import { WeekPipe } from './week.pipe';
import { HelpComponent } from './help/help.component';
import { CoursesComponent } from './courses/courses.component';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule } from '@angular/forms';

@NgModule({ declarations: [
        AppComponent,
        ShortTimePipe,
        RoomsPipe,
        LessonComponent,
        LessonEditComponent,
        TimetableComponent,
        WeekPipe,
        HelpComponent,
        CoursesComponent,
        CommentsComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
