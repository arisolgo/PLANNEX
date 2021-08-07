import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule } from '@ionic/angular';
import { SchedulerPageModule } from './pages/scheduler/scheduler.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule, 
    IonicModule,
    SchedulerPageModule
  ]
})
export class SharedModule { }
