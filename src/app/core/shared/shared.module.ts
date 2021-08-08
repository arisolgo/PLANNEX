import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule } from '@ionic/angular';
import { SchedulerPageModule } from './pages/scheduler/containers/scheduler.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule, 
    IonicModule
  ]
})
export class SharedModule { }
