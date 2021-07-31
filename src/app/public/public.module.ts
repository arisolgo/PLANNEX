import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPageModule } from './tabs/tabs.module';
import { ProvidersPageModule } from './providers/containers/providers.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, TabsPageModule, ProvidersPageModule
  ]
})
export class PublicModule { }
