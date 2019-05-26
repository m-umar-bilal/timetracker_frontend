import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ThemeModule} from "../../@theme/theme.module";
import {ButtonsModule} from "../forms/buttons/buttons.module";
import {routedComponents, TimelogsRoutingModule} from "./timelogs-routing.module";
import {DlDateTimeDateModule, DlDateTimePickerModule} from "angular-bootstrap-datetimepicker";

@NgModule({
  imports: [
    ThemeModule,
    TimelogsRoutingModule,
    ButtonsModule,
    HttpClientModule,
    Ng2SmartTableModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
  ],
  declarations: [
    ...routedComponents,

  ],
})
export class TimelogsModule { }
