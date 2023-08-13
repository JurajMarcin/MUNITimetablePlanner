import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { HelpComponent } from './help/help.component';
import { TimetableComponent } from './timetable/timetable.component';


const routes: Routes = [
  { path: 'timetable', component: TimetableComponent },
  { path: 'courses', component: CoursesComponent},
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: 'timetable' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
