import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasRoleGuard } from 'src/app/core/guards/has-role.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../tabs/home/containers/home.module').then(
            (m) => m.HomePageModule
          ),
        canActivate: [HasRoleGuard],
        data: {
          role: 1,
        },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../tabs/profile/containers/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'listing/:tipoId',
        loadChildren: () =>
          import('../tabs/listing/containers/listing.module').then(
            (m) => m.ListingPageModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../tabs/calendar/containers/calendar.module').then(
            (m) => m.CalendarPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
