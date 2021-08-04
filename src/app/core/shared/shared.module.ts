import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule } from '@ionic/angular';
import { SchedulerComponent } from './components/scheduler/scheduler.component';


@NgModule({
  declarations: [SchedulerComponent],
  imports: [
    CommonModule,
    HttpClientModule, 
    IonicModule
  ]
})
export class SharedModule { }
