import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SchedulerPageRoutingModule } from './scheduler-routing.module';
import { SchedulerPage } from './scheduler.page';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulerPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [SchedulerPage]
})
export class SchedulerPageModule {}