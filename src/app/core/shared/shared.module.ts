import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [CategoryFilterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule
  ],
  exports: [CategoryFilterComponent]

})
export class SharedModule { }
