import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonRouterOutlet } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ProviderReviewComponent } from './provider-review/provider-review.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TabsPageRoutingModule],
  declarations: [TabsPage, ProviderReviewComponent],
  providers: [IonRouterOutlet],
})
export class TabsPageModule {}
