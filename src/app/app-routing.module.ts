import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  { path: 'timetable', component: TimetableComponent },
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
