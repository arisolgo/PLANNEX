import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../tabs/profile/containers/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../tabs/calendar/calendar.module').then(
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
