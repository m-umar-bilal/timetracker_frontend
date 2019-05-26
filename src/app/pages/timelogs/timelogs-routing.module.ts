import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimelogsComponent} from "./timelogs.component";
import {AddTimelogComponent} from "./add-timelog/add-timelog.component";
import {ViewTimelogsComponent} from "./view-timelog/view-timelog.component";


const routes: Routes = [{
  path: '',
  component: TimelogsComponent,
  children: [
    {
      path: 'add',
      component: AddTimelogComponent,
    },
    {
      path: 'view/:projectId',
      component: ViewTimelogsComponent,
    },

  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TimelogsRoutingModule {
}

export const routedComponents = [
  AddTimelogComponent,
  TimelogsComponent,
  ViewTimelogsComponent

];
