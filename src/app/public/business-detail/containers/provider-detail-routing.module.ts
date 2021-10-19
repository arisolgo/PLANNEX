import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessDetailPage } from './provider-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessDetailPageRoutingModule {}
