import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {ProjectsRoutingModule, routedComponents} from './projects-routing.module';
import {ButtonsModule} from "../forms/buttons/buttons.module";
import {HttpClientModule} from "@angular/common/http";
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  imports: [
    ThemeModule,
    ProjectsRoutingModule,
    ButtonsModule,
    HttpClientModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,

  ],
})

export class ProjectsModule {
}
