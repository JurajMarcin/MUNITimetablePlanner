import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';
import { TimetableEditComponent } from './timetable-edit/timetable-edit.component';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  { path: 'basic', component: TimetableComponent },
  { path: 'advanced', component: TimetableEditComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: 'basic' }
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
