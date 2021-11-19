import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';

import { NgCalendarModule } from 'ionic2-calendar';
import { EditAppointmentComponent } from '../components/edit-appointment.component';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgCalendarModule,
    SharedModule,
  ],
  declarations: [EditAppointmentComponent, CalendarPage],
})
export class CalendarPageModule {}
