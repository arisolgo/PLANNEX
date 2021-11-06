import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPageModule } from './tabs/tabs.module';
import { ProvidersPageModule } from './providers/containers/providers.module';
import { SharedModule } from '../core/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, SharedModule, TabsPageModule, ProvidersPageModule
  ]
})
export class PublicModule { }
