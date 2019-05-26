import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import {CreateProjectsComponent} from "./create-projects/create-projects.component";
import {ListProjectsComponent} from "./list-projects/list-projects.component";
import {ViewProjectsComponent} from "./view-only/view-projects.component";


const routes: Routes = [{

  path: '',
  component: ProjectsComponent,
  children: [
    {
      path: 'create',
      component: CreateProjectsComponent,
    },
    {
      path: 'list',
      component: ListProjectsComponent,
    },  {
      path: 'view',
      component: ViewProjectsComponent,
    },
    // {
    //   path: 'layouts',
    //   component: FormLayoutsComponent,
    // },
    // {
    //   path: 'buttons',
    //   component: ButtonsComponent,
    // },
    // {
    //   path: 'datepicker',
    //   component: DatepickerComponent,
    // },
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
export class ProjectsRoutingModule {

}

export const routedComponents = [
  ProjectsComponent,
  CreateProjectsComponent,
  ListProjectsComponent,
  ViewProjectsComponent
];
